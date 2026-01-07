import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Input, InputField } from './Input'
import { VStack, Box } from '@chakra-ui/react'

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter text...')

    await expect(input).toBeVisible()
    await expect(input).toBeEnabled()

    // Type in input
    await userEvent.type(input, 'Hello World')
    await expect(input).toHaveValue('Hello World')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const smallInput = canvas.getByPlaceholderText('Small input')
    const mediumInput = canvas.getByPlaceholderText('Medium input')
    const largeInput = canvas.getByPlaceholderText('Large input')

    await expect(smallInput).toBeVisible()
    await expect(mediumInput).toBeVisible()
    await expect(largeInput).toBeVisible()

    // Test typing in each size
    await userEvent.type(smallInput, 'sm')
    await expect(smallInput).toHaveValue('sm')

    await userEvent.type(mediumInput, 'md')
    await expect(mediumInput).toHaveValue('md')

    await userEvent.type(largeInput, 'lg')
    await expect(largeInput).toHaveValue('lg')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const outlineInput = canvas.getByPlaceholderText('Outline variant')
    const filledInput = canvas.getByPlaceholderText('Filled variant')
    const flushedInput = canvas.getByPlaceholderText('Flushed variant')

    await expect(outlineInput).toBeVisible()
    await expect(filledInput).toBeVisible()
    await expect(flushedInput).toBeVisible()

    // Test typing in outline variant
    await userEvent.type(outlineInput, 'outline text')
    await expect(outlineInput).toHaveValue('outline text')

    // Test typing in filled variant
    await userEvent.type(filledInput, 'filled text')
    await expect(filledInput).toHaveValue('filled text')

    // Test typing in flushed variant
    await userEvent.type(flushedInput, 'flushed text')
    await expect(flushedInput).toHaveValue('flushed text')
  },
}

/**
 * Input states
 */
export const States: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input placeholder="Default state" data-testid="default-input" />
      <Input placeholder="Disabled state" isDisabled data-testid="disabled-input" />
      <Input
        placeholder="Read-only state"
        isReadOnly
        defaultValue="Read only value"
        data-testid="readonly-input"
      />
      <Input placeholder="Invalid state" isInvalid data-testid="invalid-input" />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const defaultInput = canvas.getByTestId('default-input')
    const disabledInput = canvas.getByTestId('disabled-input')
    const readonlyInput = canvas.getByTestId('readonly-input')
    const invalidInput = canvas.getByTestId('invalid-input')

    // Default should be enabled and editable
    await expect(defaultInput).toBeEnabled()
    await userEvent.type(defaultInput, 'typing')
    await expect(defaultInput).toHaveValue('typing')

    // Disabled should not be editable
    await expect(disabledInput).toBeDisabled()

    // Read-only should have value but not be editable
    await expect(readonlyInput).toHaveValue('Read only value')
    await expect(readonlyInput).toHaveAttribute('readonly')

    // Invalid should have aria-invalid
    await expect(invalidInput).toHaveAttribute('aria-invalid', 'true')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify labels render
    await expect(canvas.getByText('Email')).toBeVisible()
    await expect(canvas.getByText('Password')).toBeVisible()

    // Find inputs by their associated labels
    const emailInput = canvas.getByPlaceholderText('you@example.com')
    const passwordInput = canvas.getByPlaceholderText('Enter password')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()

    // Test typing email
    await userEvent.type(emailInput, 'test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')

    // Test typing password
    await userEvent.type(passwordInput, 'secret123')
    await expect(passwordInput).toHaveValue('secret123')

    // Password input should mask text
    await expect(passwordInput).toHaveAttribute('type', 'password')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify label and helper text
    await expect(canvas.getByText('Username')).toBeVisible()
    await expect(canvas.getByText(/Choose a unique username/i)).toBeVisible()

    // Find and test input
    const input = canvas.getByPlaceholderText('johndoe')
    await expect(input).toBeVisible()

    await userEvent.type(input, 'myusername')
    await expect(input).toHaveValue('myusername')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify error message displays
    await expect(canvas.getByText('Please enter a valid email address')).toBeVisible()

    // Find input and verify invalid state
    const input = canvas.getByDisplayValue('invalid-email')
    await expect(input).toBeVisible()
    await expect(input).toHaveAttribute('aria-invalid', 'true')

    // Clear and type valid email
    await userEvent.clear(input)
    await userEvent.type(input, 'valid@email.com')
    await expect(input).toHaveValue('valid@email.com')
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all input types render
    const textInput = canvas.getByPlaceholderText('Enter text')
    const emailInput = canvas.getByPlaceholderText('you@example.com')
    const passwordInput = canvas.getByPlaceholderText('Enter password')
    const numberInput = canvas.getByPlaceholderText('0')
    const searchInput = canvas.getByPlaceholderText('Search...')

    await expect(textInput).toHaveAttribute('type', 'text')
    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await expect(numberInput).toHaveAttribute('type', 'number')
    await expect(searchInput).toHaveAttribute('type', 'search')

    // Test text input
    await userEvent.type(textInput, 'Hello')
    await expect(textInput).toHaveValue('Hello')

    // Test number input
    await userEvent.type(numberInput, '42')
    await expect(numberInput).toHaveValue(42)
  },
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

/**
 * Copy paste test
 */
export const CopyPaste: Story = {
  render: () => (
    <VStack gap={4} width="300px">
      <Input placeholder="Source input" data-testid="source-input" defaultValue="Copy this text" />
      <Input placeholder="Target input" data-testid="target-input" />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const sourceInput = canvas.getByTestId('source-input')
    const targetInput = canvas.getByTestId('target-input')

    // Focus source and select all
    await userEvent.click(sourceInput)
    await expect(sourceInput).toHaveFocus()
    await expect(sourceInput).toHaveValue('Copy this text')

    // Focus target and type
    await userEvent.click(targetInput)
    await userEvent.type(targetInput, 'Pasted content')
    await expect(targetInput).toHaveValue('Pasted content')
  },
}

/**
 * Focus and blur test
 */
export const FocusBlur: Story = {
  args: {
    placeholder: 'Focus me...',
    'data-testid': 'focus-input',
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
    const input = canvas.getByTestId('focus-input')

    // Initially not focused
    await expect(input).not.toHaveFocus()

    // Click to focus
    await userEvent.click(input)
    await expect(input).toHaveFocus()

    // Tab away to blur
    await userEvent.tab()
    await expect(input).not.toHaveFocus()

    // Tab back to focus again
    await userEvent.tab({ shift: true })
    await expect(input).toHaveFocus()
  },
}
