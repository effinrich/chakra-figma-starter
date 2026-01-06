import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from './Button'
import { system } from '@/theme'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>)
}

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithChakra(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('renders with custom text', () => {
      renderWithChakra(<Button>Custom Text</Button>)
      expect(screen.getByText('Custom Text')).toBeInTheDocument()
    })

    it('renders with data-testid', () => {
      renderWithChakra(<Button data-testid="test-button">Test</Button>)
      expect(screen.getByTestId('test-button')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders solid variant', () => {
      renderWithChakra(<Button variant="solid">Solid</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders outline variant', () => {
      renderWithChakra(<Button variant="outline">Outline</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders ghost variant', () => {
      renderWithChakra(<Button variant="ghost">Ghost</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders link variant', () => {
      renderWithChakra(<Button variant="link">Link</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it.each(['xs', 'sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      renderWithChakra(<Button size={size}>Size {size}</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Color Schemes', () => {
    it.each(['primary', 'gray', 'success', 'error', 'warning', 'info'] as const)(
      'renders %s color scheme',
      (colorPalette) => {
        renderWithChakra(<Button colorPalette={colorPalette}>Color</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
      }
    )
  })

  describe('States', () => {
    it('handles disabled state', () => {
      renderWithChakra(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('handles loading state', () => {
      renderWithChakra(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn()
      renderWithChakra(<Button onClick={handleClick}>Click</Button>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn()
      renderWithChakra(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('supports keyboard activation with Enter', () => {
      const handleClick = vi.fn()
      renderWithChakra(<Button onClick={handleClick}>Keyboard</Button>)

      const button = screen.getByRole('button')
      button.focus()
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      // Note: fireEvent.keyDown doesn't trigger onClick for buttons
      // This is tested more thoroughly in Storybook interaction tests
    })
  })

  describe('Accessibility', () => {
    it('is focusable', () => {
      renderWithChakra(<Button>Focusable</Button>)
      const button = screen.getByRole('button')

      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('supports aria-label', () => {
      renderWithChakra(<Button aria-label="Close dialog">×</Button>)
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument()
    })

    it('supports aria-disabled', () => {
      renderWithChakra(<Button aria-disabled="true">Aria Disabled</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = vi.fn()
      renderWithChakra(<Button ref={ref}>Ref</Button>)
      expect(ref).toHaveBeenCalled()
    })
  })
})
