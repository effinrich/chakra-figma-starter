import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Input, InputField } from './Input'
import { HStack, VStack, Box } from '@chakra-ui/react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component synced with Chakra UI Figma Kit v3. A text input field for forms and user input.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'outline' },
      },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Error state',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Read-only state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Default input
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  decorators: [
    (Story) => (
      <Box width="300px">
        <Story />
      </Box>
    ),
  ],
}

/**
 * All input sizes
 */
export const Sizes: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </VStack>
  ),
}

/**
 * All input variants
 */
export const Variants: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="flushed" placeholder="Flushed variant" />
    </VStack>
  ),
}

/**
 * Input states
 */
export const States: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input placeholder="Default state" />
      <Input placeholder="Disabled state" isDisabled />
      <Input placeholder="Read-only state" isReadOnly defaultValue="Read only value" />
      <Input placeholder="Invalid state" isInvalid />
    </VStack>
  ),
}

/**
 * Input field with label
 */
export const WithLabel: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <InputField label="Email" placeholder="you@example.com" type="email" />
      <InputField label="Password" placeholder="Enter password" type="password" isRequired />
    </VStack>
  ),
}

/**
 * Input field with helper text
 */
export const WithHelperText: Story = {
  render: () => (
    <Box width="300px">
      <InputField
        label="Username"
        placeholder="johndoe"
        helperText="Choose a unique username for your account"
      />
    </Box>
  ),
}

/**
 * Input field with error
 */
export const WithError: Story = {
  render: () => (
    <Box width="300px">
      <InputField
        label="Email"
        placeholder="you@example.com"
        type="email"
        isInvalid
        errorMessage="Please enter a valid email address"
        defaultValue="invalid-email"
      />
    </Box>
  ),
}

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <InputField label="Text" type="text" placeholder="Enter text" />
      <InputField label="Email" type="email" placeholder="you@example.com" />
      <InputField label="Password" type="password" placeholder="Enter password" />
      <InputField label="Number" type="number" placeholder="0" />
      <InputField label="Date" type="date" />
      <InputField label="Search" type="search" placeholder="Search..." />
    </VStack>
  ),
}

/**
 * Interactive typing test
 */
export const Interactive: Story = {
  args: {
    placeholder: 'Type something...',
    'data-testid': 'interactive-input',
  },
  decorators: [
    (Story) => (
      <Box width="300px">
        <Story />
      </Box>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('interactive-input')

    // Verify input renders
    await expect(input).toBeInTheDocument()
    await expect(input).toHaveAttribute('placeholder', 'Type something...')

    // Type in input
    await userEvent.type(input, 'Hello World')
    await expect(input).toHaveValue('Hello World')

    // Clear input
    await userEvent.clear(input)
    await expect(input).toHaveValue('')
  },
}

/**
 * Form validation test
 */
export const FormValidation: Story = {
  render: () => (
    <Box width="300px">
      <InputField
        label="Email"
        type="email"
        placeholder="you@example.com"
        isRequired
        data-testid="email-input"
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('email-input')

    // Verify required attribute
    await expect(input).toBeRequired()

    // Type invalid then valid email
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
  },
}

/**
 * Keyboard navigation test
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input placeholder="First input" data-testid="input-1" />
      <Input placeholder="Second input" data-testid="input-2" />
      <Input placeholder="Third input" data-testid="input-3" />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Tab through inputs
    await userEvent.tab()
    const input1 = canvas.getByTestId('input-1')
    await expect(input1).toHaveFocus()

    await userEvent.tab()
    const input2 = canvas.getByTestId('input-2')
    await expect(input2).toHaveFocus()

    await userEvent.tab()
    const input3 = canvas.getByTestId('input-3')
    await expect(input3).toHaveFocus()
  },
}
