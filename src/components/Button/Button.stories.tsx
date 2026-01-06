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
        defaultValue: { summary: false },
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
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await expect(button).toBeDisabled()
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
  },
  parameters: {
    layout: 'padded',
  },
}
