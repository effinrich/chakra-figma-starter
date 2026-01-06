import { forwardRef } from 'react'
import { Button as ChakraButton, type ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

export interface ButtonProps extends ChakraButtonProps {
  /**
   * Button style variant
   * @default "solid"
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  /**
   * Button size
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * Color scheme for the button
   * @default "primary"
   */
  colorPalette?: 'primary' | 'gray' | 'success' | 'error' | 'warning' | 'info'
  /**
   * Loading state
   * @default false
   */
  loading?: boolean
  /**
   * Test ID for testing
   */
  'data-testid'?: string
}

/**
 * Button component synced with Chakra UI Figma Kit v3
 *
 * Figma Reference: Button component from design system
 *
 * @example
 * ```tsx
 * <Button variant="solid" colorPalette="primary">
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      colorPalette = 'primary',
      loading = false,
      children,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        colorPalette={colorPalette}
        loading={loading}
        data-testid={testId}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'
