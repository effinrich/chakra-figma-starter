import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { system } from '@/theme'

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>)
}

describe('Card', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithChakra(<Card data-testid="card">Content</Card>)
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      renderWithChakra(<Card>Card Content</Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('renders with data-testid', () => {
      renderWithChakra(<Card data-testid="test-card">Test</Card>)
      expect(screen.getByTestId('test-card')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it.each(['elevated', 'outline', 'filled'] as const)('renders %s variant', (variant) => {
      renderWithChakra(
        <Card variant={variant} data-testid="card">
          Content
        </Card>
      )
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      renderWithChakra(
        <Card size={size} data-testid="card">
          Content
        </Card>
      )
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })
  })

  describe('Composition', () => {
    it('renders with CardHeader', () => {
      renderWithChakra(
        <Card>
          <CardHeader>Title</CardHeader>
        </Card>
      )
      expect(screen.getByText('Title')).toBeInTheDocument()
    })

    it('renders with CardBody', () => {
      renderWithChakra(
        <Card>
          <CardBody>Body Content</CardBody>
        </Card>
      )
      expect(screen.getByText('Body Content')).toBeInTheDocument()
    })

    it('renders with CardFooter', () => {
      renderWithChakra(
        <Card>
          <CardFooter>Footer Content</CardFooter>
        </Card>
      )
      expect(screen.getByText('Footer Content')).toBeInTheDocument()
    })

    it('renders full card structure', () => {
      renderWithChakra(
        <Card data-testid="full-card">
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      )

      expect(screen.getByTestId('full-card')).toBeInTheDocument()
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('accepts custom width', () => {
      renderWithChakra(
        <Card width="400px" data-testid="card">
          Content
        </Card>
      )
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })

    it('accepts custom styles', () => {
      renderWithChakra(
        <Card bg="blue.100" data-testid="card">
          Content
        </Card>
      )
      expect(screen.getByTestId('card')).toBeInTheDocument()
    })
  })

  describe('Ref Forwarding', () => {
    it('forwards ref to Card', () => {
      const ref = vi.fn()
      renderWithChakra(<Card ref={ref}>Content</Card>)
      expect(ref).toHaveBeenCalled()
    })

    it('forwards ref to CardHeader', () => {
      const ref = vi.fn()
      renderWithChakra(
        <Card>
          <CardHeader ref={ref}>Header</CardHeader>
        </Card>
      )
      expect(ref).toHaveBeenCalled()
    })

    it('forwards ref to CardBody', () => {
      const ref = vi.fn()
      renderWithChakra(
        <Card>
          <CardBody ref={ref}>Body</CardBody>
        </Card>
      )
      expect(ref).toHaveBeenCalled()
    })

    it('forwards ref to CardFooter', () => {
      const ref = vi.fn()
      renderWithChakra(
        <Card>
          <CardFooter ref={ref}>Footer</CardFooter>
        </Card>
      )
      expect(ref).toHaveBeenCalled()
    })
  })
})
