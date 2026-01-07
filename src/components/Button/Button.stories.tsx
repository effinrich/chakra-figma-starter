import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within, fn } from '@storybook/test'
import { Button } from './Button'
import { HStack, VStack } from '@chakra-ui/react'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component synced with Chakra UI Figma Kit v3. Supports multiple variants, sizes, and color schemes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    colorPalette: {
      control: 'select',
      options: ['primary', 'gray', 'success', 'error', 'warning', 'info'],
      description: 'Color scheme',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Default button with solid variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorPalette: 'primary',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /button/i })

    await expect(button).toBeInTheDocument()
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/**
 * All button variants
 */
export const Variants: Story = {
  render: () => (
    <HStack gap={4}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button supports four variants: solid, outline, ghost, and link.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const solidBtn = canvas.getByRole('button', { name: /solid/i })
    const outlineBtn = canvas.getByRole('button', { name: /outline/i })
    const ghostBtn = canvas.getByRole('button', { name: /ghost/i })
    const linkBtn = canvas.getByRole('button', { name: /link/i })

    await expect(solidBtn).toBeVisible()
    await expect(outlineBtn).toBeVisible()
    await expect(ghostBtn).toBeVisible()
    await expect(linkBtn).toBeVisible()

    // Verify all buttons are clickable
    await userEvent.click(solidBtn)
    await userEvent.click(outlineBtn)
    await userEvent.click(ghostBtn)
    await userEvent.click(linkBtn)
  },
}

/**
 * All button sizes
 */
export const Sizes: Story = {
  render: () => (
    <HStack gap={4} align="center">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button comes in four sizes: xs, sm, md, and lg.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const xsBtn = canvas.getByRole('button', { name: /extra small/i })
    const smBtn = canvas.getByRole('button', { name: /^small$/i })
    const mdBtn = canvas.getByRole('button', { name: /medium/i })
    const lgBtn = canvas.getByRole('button', { name: /large/i })

    await expect(xsBtn).toBeVisible()
    await expect(smBtn).toBeVisible()
    await expect(mdBtn).toBeVisible()
    await expect(lgBtn).toBeVisible()

    // All sizes should be enabled and interactive
    await expect(xsBtn).toBeEnabled()
    await expect(smBtn).toBeEnabled()
    await expect(mdBtn).toBeEnabled()
    await expect(lgBtn).toBeEnabled()
  },
}

/**
 * Color schemes showcase
 */
export const ColorSchemes: Story = {
  render: () => (
    <VStack gap={4}>
      <HStack gap={4}>
        <Button colorPalette="primary">Primary</Button>
        <Button colorPalette="gray">Gray</Button>
        <Button colorPalette="success">Success</Button>
      </HStack>
      <HStack gap={4}>
        <Button colorPalette="error">Error</Button>
        <Button colorPalette="warning">Warning</Button>
        <Button colorPalette="info">Info</Button>
      </HStack>
    </VStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button supports multiple color schemes mapped from Figma tokens.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const primaryBtn = canvas.getByRole('button', { name: /primary/i })
    const grayBtn = canvas.getByRole('button', { name: /gray/i })
    const successBtn = canvas.getByRole('button', { name: /success/i })
    const errorBtn = canvas.getByRole('button', { name: /error/i })
    const warningBtn = canvas.getByRole('button', { name: /warning/i })
    const infoBtn = canvas.getByRole('button', { name: /info/i })

    // Verify all color scheme buttons render
    await expect(primaryBtn).toBeVisible()
    await expect(grayBtn).toBeVisible()
    await expect(successBtn).toBeVisible()
    await expect(errorBtn).toBeVisible()
    await expect(warningBtn).toBeVisible()
    await expect(infoBtn).toBeVisible()

    // Verify all are clickable
    await userEvent.click(primaryBtn)
    await userEvent.click(errorBtn)
  },
}

/**
 * Buttons with icons
 */
export const WithIcons: Story = {
  render: () => (
    <HStack gap={4}>
      <Button>
        <Mail />
        Email
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight />
      </Button>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons can include icons using lucide-react.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailBtn = canvas.getByRole('button', { name: /email/i })
    const continueBtn = canvas.getByRole('button', { name: /continue/i })

    await expect(emailBtn).toBeVisible()
    await expect(continueBtn).toBeVisible()

    // Verify icons are rendered (buttons should contain svg elements)
    await expect(emailBtn.querySelector('svg')).toBeInTheDocument()
    await expect(continueBtn.querySelector('svg')).toBeInTheDocument()

    // Verify clickable
    await userEvent.click(emailBtn)
    await userEvent.click(continueBtn)
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  render: () => (
    <HStack gap={4}>
      <Button loading>Loading</Button>
      <Button loading variant="outline">
        <Loader2 className="animate-spin" />
        Processing
      </Button>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button displays a loading state when processing.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const loadingBtn = canvas.getByRole('button', { name: /loading/i })
    const processingBtn = canvas.getByRole('button', { name: /processing/i })

    await expect(loadingBtn).toBeVisible()
    await expect(processingBtn).toBeVisible()

    // Loading buttons should be disabled
    await expect(loadingBtn).toBeDisabled()
    await expect(processingBtn).toBeDisabled()
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await expect(button).toBeDisabled()
    await expect(button).toBeVisible()

    // Clicking disabled button should not trigger onClick
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

/**
 * Interactive click test
 */
export const Interactive: Story = {
  args: {
    children: 'Click me',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })

    // Verify button renders
    await expect(button).toBeInTheDocument()
    await expect(button).toBeEnabled()

    // Test click
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)

    // Test double click
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

/**
 * Keyboard accessibility test
 */
export const KeyboardAccessibility: Story = {
  args: {
    children: 'Press Enter or Space',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Tab to button
    await userEvent.tab()
    await expect(button).toHaveFocus()

    // Press Enter
    await userEvent.keyboard('{Enter}')
    await expect(args.onClick).toHaveBeenCalledTimes(1)

    // Press Space
    await userEvent.keyboard(' ')
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    width: 'full',
    onClick: fn(),
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /full width/i })

    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()

    // Verify button is clickable
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
