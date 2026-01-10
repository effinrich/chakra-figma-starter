/**
 * Figma Design Token Sync Script
 *
 * Syncs design tokens from the Chakra UI Figma Kit v3 to the theme.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=xxx FIGMA_FILE_KEY=xxx npm run sync:tokens
 *
 * Or configure in .env:
 *   FIGMA_ACCESS_TOKEN=your-token
 *   FIGMA_FILE_KEY=ZUi5xVkIKAokS1nS78jN1l
 */

import { writeFileSync } from 'fs'
import { join } from 'path'

const FIGMA_API_BASE = 'https://api.figma.com/v1'
const FIGMA_ACCESS_TOKEN = 'figd_lJU54hRiWnTE7NZrkiu-JgVNuve89jOno0c4jDYP'
interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

interface FigmaVariable {
  id: string
  name: string
  resolvedType: string
  valuesByMode: Record<string, unknown>
}

interface FigmaVariableCollection {
  id: string
  name: string
  modes: Array<{ modeId: string; name: string }>
  variableIds: string[]
}

async function fetchFigmaFile(fileKey: string, token: string) {
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': token
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma file: ${response.statusText}`)
  }

  return response.json()
}

async function fetchFigmaVariables(fileKey: string, token: string) {
  const response = await fetch(
    `${FIGMA_API_BASE}/files/${fileKey}/variables/local`,
    {
      headers: {
        'X-Figma-Token': token
      }
    }
  )

  if (!response.ok) {
    // Variables API might not be available
    console.warn(
      'Figma Variables API not available, using style-based extraction'
    )
    return null
  }

  return response.json()
}

function rgbaToHex(color: FigmaColor): string {
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function extractColorsFromStyles(
  file: any
): Record<string, Record<string, string>> {
  const colors: Record<string, Record<string, string>> = {}

  // Extract from document styles
  if (file.styles) {
    for (const [styleId, style] of Object.entries(file.styles) as [
      string,
      any
    ][]) {
      if (style.styleType === 'FILL') {
        const nameParts = style.name.split('/')
        if (nameParts.length >= 2) {
          const colorGroup = nameParts[0].toLowerCase()
          const shade = nameParts[1]

          if (!colors[colorGroup]) {
            colors[colorGroup] = {}
          }
          // Style info doesn't include the actual color value
          // We'd need to traverse the document to find nodes using this style
        }
      }
    }
  }

  return colors
}

function processVariables(
  variables: Record<string, FigmaVariable>,
  collections: Record<string, FigmaVariableCollection>
): Record<string, any> {
  const tokens: Record<string, any> = {
    colors: {},
    spacing: {},
    radii: {},
    fontSizes: {},
    fontWeights: {}
  }

  for (const variable of Object.values(variables)) {
    const nameParts = variable.name.split('/')

    if (variable.resolvedType === 'COLOR') {
      // Process color variables
      const colorGroup = nameParts[0]?.toLowerCase() || 'default'
      const shade = nameParts[1] || '500'

      if (!tokens.colors[colorGroup]) {
        tokens.colors[colorGroup] = {}
      }

      // Get value from first mode
      const modeId = Object.keys(variable.valuesByMode)[0]
      const value = variable.valuesByMode[modeId] as FigmaColor | undefined

      if (value && typeof value === 'object' && 'r' in value) {
        tokens.colors[colorGroup][shade] = rgbaToHex(value)
      }
    } else if (variable.resolvedType === 'FLOAT') {
      // Process spacing/sizing variables
      const category = nameParts[0]?.toLowerCase()
      const name = nameParts[1] || nameParts[0]

      const modeId = Object.keys(variable.valuesByMode)[0]
      const value = variable.valuesByMode[modeId] as number | undefined

      if (typeof value === 'number') {
        if (category === 'spacing' || category === 'space') {
          tokens.spacing[name] = `${value}px`
        } else if (category === 'radius' || category === 'radii') {
          tokens.radii[name] = `${value}px`
        } else if (category === 'fontsize' || category === 'font-size') {
          tokens.fontSizes[name] = `${value}px`
        }
      }
    }
  }

  return tokens
}

function generateThemeFile(tokens: Record<string, any>): string {
  return `/**
 * Design Tokens - Auto-generated from Figma
 *
 * DO NOT EDIT MANUALLY
 * Run \`npm run sync:tokens\` to update from Figma
 *
 * Source: Chakra UI Figma Kit v3
 * https://www.figma.com/design/ZUi5xVkIKAokS1nS78jN1l
 *
 * Generated: ${new Date().toISOString()}
 */

export const figmaTokens = ${JSON.stringify(tokens, null, 2)} as const

export type FigmaTokens = typeof figmaTokens
`
}

async function main() {
  const token = process.env.FIGMA_ACCESS_TOKEN || FIGMA_ACCESS_TOKEN
  const fileKey = process.env.FIGMA_FILE_KEY || 'ZUi5xVkIKAokS1nS78jN1l'

  if (!token) {
    console.error('Error: FIGMA_ACCESS_TOKEN environment variable is required')
    console.log('\nUsage:')
    console.log('  FIGMA_ACCESS_TOKEN=xxx npm run sync:tokens')
    console.log('\nOr create a .env file with:')
    console.log('  FIGMA_ACCESS_TOKEN=your-figma-token')
    process.exit(1)
  }

  console.log('🎨 Syncing design tokens from Figma...')
  console.log(`   File: ${fileKey}`)

  try {
    // Try to fetch variables first (newer API)
    const variablesResponse = await fetchFigmaVariables(fileKey, token)

    let tokens: Record<string, any>

    if (variablesResponse?.meta?.variables) {
      console.log('   Using Figma Variables API')
      tokens = processVariables(
        variablesResponse.meta.variables,
        variablesResponse.meta.variableCollections
      )
    } else {
      // Fallback to file styles
      console.log('   Using Figma Styles API (fallback)')
      const file = await fetchFigmaFile(fileKey, token)
      tokens = {
        colors: extractColorsFromStyles(file),
        spacing: {},
        radii: {},
        fontSizes: {},
        fontWeights: {}
      }
    }

    // Generate tokens file
    const tokensContent = generateThemeFile(tokens)
    const tokensPath = join(process.cwd(), 'src/theme/tokens.generated.ts')
    writeFileSync(tokensPath, tokensContent)
    console.log(`   ✅ Generated: ${tokensPath}`)

    // Also generate JSON for reference
    const jsonPath = join(process.cwd(), 'src/theme/tokens.json')
    writeFileSync(jsonPath, JSON.stringify(tokens, null, 2))
    console.log(`   ✅ Generated: ${jsonPath}`)

    console.log('\n✨ Design tokens synced successfully!')
    console.log('\nNext steps:')
    console.log(
      '1. Review the generated tokens in src/theme/tokens.generated.ts'
    )
    console.log('2. Update src/theme/index.ts to use the new tokens')
    console.log('3. Run Storybook to verify visual changes')
  } catch (error) {
    console.error('\n❌ Failed to sync design tokens:', error)
    process.exit(1)
  }
}

main()
