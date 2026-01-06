import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Input, InputField } from './Input'
import { system } from '@/theme'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>)
}

describe('Input', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithChakra(<Input data-testid="input" />)
      expect(screen.getByTestId('input')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      renderWithChakra(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders with default value', () => {
      renderWithChakra(<Input defaultValue="Default" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveValue('Default')
    })
  })

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      renderWithChakra(<Input size={size} data-testid="input" />)
      expect(screen.getByTestId('input')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it.each(['outline', 'filled', 'flushed'] as const)('renders %s variant', (variant) => {
      renderWithChakra(<Input variant={variant} data-testid="input" />)
      expect(screen.getByTestId('input')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      renderWithChakra(<Input isDisabled data-testid="input" />)
      expect(screen.getByTestId('input')).toBeDisabled()
    })

    it('handles read-only state', () => {
      renderWithChakra(<Input isReadOnly data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('readonly')
    })

    it('handles required state', () => {
      renderWithChakra(<Input isRequired data-testid="input" />)
      expect(screen.getByTestId('input')).toBeRequired()
    })

    it('handles invalid state', () => {
      renderWithChakra(<Input isInvalid data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Interactions', () => {
    it('accepts user input', () => {
      renderWithChakra(<Input data-testid="input" />)
      const input = screen.getByTestId('input')

      fireEvent.change(input, { target: { value: 'Hello' } })
      expect(input).toHaveValue('Hello')
    })

    it('calls onChange when value changes', () => {
      const handleChange = vi.fn()
      renderWithChakra(<Input onChange={handleChange} data-testid="input" />)

      fireEvent.change(screen.getByTestId('input'), { target: { value: 'Test' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('calls onFocus when focused', () => {
      const handleFocus = vi.fn()
      renderWithChakra(<Input onFocus={handleFocus} data-testid="input" />)

      fireEvent.focus(screen.getByTestId('input'))
      expect(handleFocus).toHaveBeenCalled()
    })

    it('calls onBlur when blurred', () => {
      const handleBlur = vi.fn()
      renderWithChakra(<Input onBlur={handleBlur} data-testid="input" />)

      const input = screen.getByTestId('input')
      fireEvent.focus(input)
      fireEvent.blur(input)
      expect(handleBlur).toHaveBeenCalled()
    })
  })

  describe('Input Types', () => {
    it.each(['text', 'email', 'password', 'number', 'search'] as const)(
      'renders %s type',
      (type) => {
        renderWithChakra(<Input type={type} data-testid="input" />)
        expect(screen.getByTestId('input')).toHaveAttribute('type', type)
      }
    )
  })

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      renderWithChakra(<Input aria-label="Email input" />)
      expect(screen.getByLabelText('Email input')).toBeInTheDocument()
    })

    it('supports aria-describedby', () => {
      renderWithChakra(<Input aria-describedby="helper-text" data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveAttribute('aria-describedby', 'helper-text')
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn()
      renderWithChakra(<Input ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })
})

describe('InputField', () => {
  describe('Rendering', () => {
    it('renders with label', () => {
      renderWithChakra(<InputField label="Email" />)
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders with required indicator', () => {
      renderWithChakra(<InputField label="Email" isRequired />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      renderWithChakra(<InputField helperText="Enter your email" />)
      expect(screen.getByText('Enter your email')).toBeInTheDocument()
    })

    it('renders with error message when invalid', () => {
      renderWithChakra(<InputField isInvalid errorMessage="Invalid email" />)
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
    })

    it('shows error message instead of helper text when invalid', () => {
      renderWithChakra(
        <InputField isInvalid errorMessage="Error" helperText="Helper" />
      )
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.queryByText('Helper')).not.toBeInTheDocument()
    })
  })

  describe('Label Association', () => {
    it('associates label with input', () => {
      renderWithChakra(<InputField label="Email" id="email-input" />)
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('id', 'email-input')
    })

    it('generates unique ID if not provided', () => {
      renderWithChakra(<InputField label="Email" />)
      const input = screen.getByLabelText('Email')
      expect(input).toHaveAttribute('id')
      expect(input.id).toMatch(/^input-/)
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn()
      renderWithChakra(<InputField label="Email" ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })
})
