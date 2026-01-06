/**
 * Chakra UI Theme Configuration
 *
 * Design tokens synced from Figma:
 * https://www.figma.com/design/ZUi5xVkIKAokS1nS78jN1l/Chakra-UI----Figma-Kit--v3
 *
 * Run `npm run sync:tokens` to update from Figma
 */

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

/**
 * Design tokens extracted from Chakra UI Figma Kit v3
 * These map directly to Figma variables
 */
export const figmaTokens = {
  colors: {
    // Primary palette - maps to Figma "Primary" color set
    primary: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
    // Gray palette - maps to Figma "Gray" color set
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    },
    // Semantic colors
    success: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
    error: {
      50: '#FFF5F5',
      100: '#FED7D7',
      200: '#FEB2B2',
      300: '#FC8181',
      400: '#F56565',
      500: '#E53E3E',
      600: '#C53030',
      700: '#9B2C2C',
      800: '#822727',
      900: '#63171B',
    },
    warning: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#C05621',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },
    info: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
  },
  spacing: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
}

/**
 * Custom Chakra UI configuration extending defaults with Figma tokens
 */
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: figmaTokens.colors.primary[50] },
          100: { value: figmaTokens.colors.primary[100] },
          200: { value: figmaTokens.colors.primary[200] },
          300: { value: figmaTokens.colors.primary[300] },
          400: { value: figmaTokens.colors.primary[400] },
          500: { value: figmaTokens.colors.primary[500] },
          600: { value: figmaTokens.colors.primary[600] },
          700: { value: figmaTokens.colors.primary[700] },
          800: { value: figmaTokens.colors.primary[800] },
          900: { value: figmaTokens.colors.primary[900] },
        },
        success: {
          50: { value: figmaTokens.colors.success[50] },
          100: { value: figmaTokens.colors.success[100] },
          200: { value: figmaTokens.colors.success[200] },
          300: { value: figmaTokens.colors.success[300] },
          400: { value: figmaTokens.colors.success[400] },
          500: { value: figmaTokens.colors.success[500] },
          600: { value: figmaTokens.colors.success[600] },
          700: { value: figmaTokens.colors.success[700] },
          800: { value: figmaTokens.colors.success[800] },
          900: { value: figmaTokens.colors.success[900] },
        },
        error: {
          50: { value: figmaTokens.colors.error[50] },
          100: { value: figmaTokens.colors.error[100] },
          200: { value: figmaTokens.colors.error[200] },
          300: { value: figmaTokens.colors.error[300] },
          400: { value: figmaTokens.colors.error[400] },
          500: { value: figmaTokens.colors.error[500] },
          600: { value: figmaTokens.colors.error[600] },
          700: { value: figmaTokens.colors.error[700] },
          800: { value: figmaTokens.colors.error[800] },
          900: { value: figmaTokens.colors.error[900] },
        },
        warning: {
          50: { value: figmaTokens.colors.warning[50] },
          100: { value: figmaTokens.colors.warning[100] },
          200: { value: figmaTokens.colors.warning[200] },
          300: { value: figmaTokens.colors.warning[300] },
          400: { value: figmaTokens.colors.warning[400] },
          500: { value: figmaTokens.colors.warning[500] },
          600: { value: figmaTokens.colors.warning[600] },
          700: { value: figmaTokens.colors.warning[700] },
          800: { value: figmaTokens.colors.warning[800] },
          900: { value: figmaTokens.colors.warning[900] },
        },
        info: {
          50: { value: figmaTokens.colors.info[50] },
          100: { value: figmaTokens.colors.info[100] },
          200: { value: figmaTokens.colors.info[200] },
          300: { value: figmaTokens.colors.info[300] },
          400: { value: figmaTokens.colors.info[400] },
          500: { value: figmaTokens.colors.info[500] },
          600: { value: figmaTokens.colors.info[600] },
          700: { value: figmaTokens.colors.info[700] },
          800: { value: figmaTokens.colors.info[800] },
          900: { value: figmaTokens.colors.info[900] },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Semantic color mappings
        'bg.primary': { value: '{colors.primary.500}' },
        'bg.success': { value: '{colors.success.500}' },
        'bg.error': { value: '{colors.error.500}' },
        'bg.warning': { value: '{colors.warning.500}' },
        'bg.info': { value: '{colors.info.500}' },
        // Text colors
        'text.primary': { value: '{colors.gray.900}' },
        'text.secondary': { value: '{colors.gray.600}' },
        'text.muted': { value: '{colors.gray.400}' },
        // Border colors
        'border.default': { value: '{colors.gray.200}' },
        'border.focus': { value: '{colors.primary.500}' },
        'border.error': { value: '{colors.error.500}' },
      },
    },
  },
})

/**
 * Chakra UI system instance
 * Use this in your ChakraProvider
 */
export const system = createSystem(defaultConfig, customConfig)

/**
 * Re-export tokens for use in components
 */
export { figmaTokens as tokens }
