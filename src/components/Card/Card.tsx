import { forwardRef } from 'react'
import { Box, type BoxProps } from '@chakra-ui/react'

export interface CardProps extends BoxProps {
  /**
   * Card style variant
   * @default "elevated"
   */
  variant?: 'elevated' | 'outline' | 'filled'
  /**
   * Card size affecting padding
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Test ID for testing
   */
  'data-testid'?: string
}

const variantStyles = {
  elevated: {
    bg: 'white',
    boxShadow: 'md',
    _dark: {
      bg: 'gray.800',
    },
  },
  outline: {
    bg: 'transparent',
    borderWidth: '1px',
    borderColor: 'gray.200',
    _dark: {
      borderColor: 'gray.700',
    },
  },
  filled: {
    bg: 'gray.100',
    _dark: {
      bg: 'gray.700',
    },
  },
}

const sizeStyles = {
  sm: { p: 3 },
  md: { p: 5 },
  lg: { p: 7 },
}

/**
 * Card component synced with Chakra UI Figma Kit v3
 *
 * A flexible container for grouping related content.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" size="md">
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Content</CardBody>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevated', size = 'md', children, 'data-testid': testId, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        borderRadius="lg"
        overflow="hidden"
        data-testid={testId}
        {...variantStyles[variant]}
        {...sizeStyles[size]}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

Card.displayName = 'Card'

/**
 * Card header section
 */
export interface CardHeaderProps extends BoxProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} pb={3} fontWeight="semibold" fontSize="lg" {...props}>
        {children}
      </Box>
    )
  }
)

CardHeader.displayName = 'CardHeader'

/**
 * Card body section
 */
export interface CardBodyProps extends BoxProps {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} py={2} {...props}>
      {children}
    </Box>
  )
})

CardBody.displayName = 'CardBody'

/**
 * Card footer section
 */
export interface CardFooterProps extends BoxProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} pt={3} {...props}>
        {children}
      </Box>
    )
  }
)

CardFooter.displayName = 'CardFooter'
