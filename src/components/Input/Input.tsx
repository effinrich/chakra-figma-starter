import { forwardRef } from 'react'
import { Input as ChakraInput, type InputProps as ChakraInputProps, Box, Text } from '@chakra-ui/react'

export interface InputProps extends Omit<ChakraInputProps, 'size'> {
  /**
   * Input size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Input variant
   * @default "outline"
   */
  variant?: 'outline' | 'filled' | 'flushed'
  /**
   * Error state
   * @default false
   */
  isInvalid?: boolean
  /**
   * Disabled state
   * @default false
   */
  isDisabled?: boolean
  /**
   * Read-only state
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Required field
   * @default false
   */
  isRequired?: boolean
  /**
   * Test ID for testing
   */
  'data-testid'?: string
}

/**
 * Input component synced with Chakra UI Figma Kit v3
 *
 * A text input field for forms and user input.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" size="md" />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      isInvalid = false,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    return (
      <ChakraInput
        ref={ref}
        size={size}
        variant={variant}
        aria-invalid={isInvalid}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        data-testid={testId}
        borderColor={isInvalid ? 'error.500' : undefined}
        _focus={{
          borderColor: isInvalid ? 'error.500' : 'primary.500',
          boxShadow: isInvalid ? '0 0 0 1px var(--chakra-colors-error-500)' : '0 0 0 1px var(--chakra-colors-primary-500)',
        }}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

/**
 * Input field wrapper with label, helper text, and error message
 */
export interface InputFieldProps extends InputProps {
  /**
   * Field label
   */
  label?: string
  /**
   * Helper text displayed below input
   */
  helperText?: string
  /**
   * Error message displayed when isInvalid is true
   */
  errorMessage?: string
  /**
   * ID for the input element
   */
  id?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, helperText, errorMessage, isInvalid, id, isRequired, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

    return (
      <Box width="full">
        {label && (
          <Text
            as="label"
            htmlFor={inputId}
            display="block"
            mb={1}
            fontSize="sm"
            fontWeight="medium"
            color="gray.700"
          >
            {label}
            {isRequired && (
              <Text as="span" color="error.500" ml={1}>
                *
              </Text>
            )}
          </Text>
        )}
        <Input ref={ref} id={inputId} isInvalid={isInvalid} isRequired={isRequired} {...props} />
        {isInvalid && errorMessage ? (
          <Text mt={1} fontSize="sm" color="error.500">
            {errorMessage}
          </Text>
        ) : helperText ? (
          <Text mt={1} fontSize="sm" color="gray.500">
            {helperText}
          </Text>
        ) : null}
      </Box>
    )
  }
)

InputField.displayName = 'InputField'
