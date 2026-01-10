import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within, fn } from '@storybook/test'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from '../Button'
import { HStack, VStack, Text, Image, Box } from '@chakra-ui/react'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card component synced with Chakra UI Figma Kit v3. A flexible container for grouping related content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'elevated' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card padding size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Default card with elevated style
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>Card Title</CardHeader>
        <CardBody>
          <Text>
            This is the card body. You can put any content here including text, images, and other
            components.
          </Text>
        </CardBody>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </>
    ),
    width: '320px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify card structure renders
    await expect(canvas.getByText('Card Title')).toBeVisible()
    await expect(canvas.getByText(/This is the card body/i)).toBeVisible()

    // Verify action button is present and clickable
    const actionBtn = canvas.getByRole('button', { name: /action/i })
    await expect(actionBtn).toBeVisible()
    await expect(actionBtn).toBeEnabled()
    await userEvent.click(actionBtn)
  },
}

/**
 * All card variants
 */
export const Variants: Story = {
  render: () => (
    <HStack gap={6} align="stretch">
      <Card variant="elevated" width="200px">
        <CardHeader>Elevated</CardHeader>
        <CardBody>
          <Text fontSize="sm">Card with shadow elevation</Text>
        </CardBody>
      </Card>
      <Card variant="outline" width="200px">
        <CardHeader>Outline</CardHeader>
        <CardBody>
          <Text fontSize="sm">Card with border outline</Text>
        </CardBody>
      </Card>
      <Card variant="filled" width="200px">
        <CardHeader>Filled</CardHeader>
        <CardBody>
          <Text fontSize="sm">Card with filled background</Text>
        </CardBody>
      </Card>
    </HStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all variant cards render
    await expect(canvas.getByText('Elevated')).toBeVisible()
    await expect(canvas.getByText('Outline')).toBeVisible()
    await expect(canvas.getByText('Filled')).toBeVisible()

    // Verify descriptions
    await expect(canvas.getByText(/shadow elevation/i)).toBeVisible()
    await expect(canvas.getByText(/border outline/i)).toBeVisible()
    await expect(canvas.getByText(/filled background/i)).toBeVisible()
  },
}

/**
 * All card sizes
 */
export const Sizes: Story = {
  render: () => (
    <VStack gap={4} align="stretch">
      <Card size="sm" variant="outline">
        <CardHeader>Small Card</CardHeader>
        <CardBody>Compact padding</CardBody>
      </Card>
      <Card size="md" variant="outline">
        <CardHeader>Medium Card</CardHeader>
        <CardBody>Default padding</CardBody>
      </Card>
      <Card size="lg" variant="outline">
        <CardHeader>Large Card</CardHeader>
        <CardBody>Spacious padding</CardBody>
      </Card>
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all size cards render
    await expect(canvas.getByText('Small Card')).toBeVisible()
    await expect(canvas.getByText('Medium Card')).toBeVisible()
    await expect(canvas.getByText('Large Card')).toBeVisible()

    // Verify body content
    await expect(canvas.getByText('Compact padding')).toBeVisible()
    await expect(canvas.getByText('Default padding')).toBeVisible()
    await expect(canvas.getByText('Spacious padding')).toBeVisible()
  },
}

/**
 * Card with image
 */
export const WithImage: Story = {
  render: () => (
    <Card width="320px" p={0} overflow="hidden">
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
        alt="Green sofa"
        height="200px"
        objectFit="cover"
      />
      <Box p={5}>
        <CardHeader>Modern Sofa</CardHeader>
        <CardBody>
          <Text color="gray.600">
            A beautiful green velvet sofa perfect for any modern living room.
          </Text>
        </CardBody>
        <CardFooter>
          <HStack gap={2}>
            <Button size="sm" colorPalette="primary">
              Buy Now
            </Button>
            <Button size="sm" variant="ghost">
              Add to Cart
            </Button>
          </HStack>
        </CardFooter>
      </Box>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify image renders
    const image = canvas.getByAltText('Green sofa')
    await expect(image).toBeVisible()

    // Verify card content
    await expect(canvas.getByText('Modern Sofa')).toBeVisible()
    await expect(canvas.getByText(/beautiful green velvet sofa/i)).toBeVisible()

    // Verify action buttons
    const buyBtn = canvas.getByRole('button', { name: /buy now/i })
    const cartBtn = canvas.getByRole('button', { name: /add to cart/i })

    await expect(buyBtn).toBeVisible()
    await expect(cartBtn).toBeVisible()

    // Test button interactions
    await userEvent.click(buyBtn)
    await userEvent.click(cartBtn)
  },
}

/**
 * Horizontal card layout
 */
export const Horizontal: Story = {
  render: () => (
    <Card width="480px">
      <HStack gap={4}>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
          alt="Profile"
          borderRadius="full"
          boxSize="80px"
          objectFit="cover"
        />
        <Box flex={1}>
          <CardHeader pb={1}>Sarah Wilson</CardHeader>
          <Text fontSize="sm" color="gray.500">
            Product Designer at Design Co
          </Text>
          <CardFooter pt={2}>
            <Button size="xs" variant="outline">
              Connect
            </Button>
          </CardFooter>
        </Box>
      </HStack>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify profile image renders
    const profileImg = canvas.getByAltText('Profile')
    await expect(profileImg).toBeVisible()

    // Verify user info
    await expect(canvas.getByText('Sarah Wilson')).toBeVisible()
    await expect(canvas.getByText(/Product Designer/i)).toBeVisible()

    // Verify connect button
    const connectBtn = canvas.getByRole('button', { name: /connect/i })
    await expect(connectBtn).toBeVisible()
    await expect(connectBtn).toBeEnabled()
    await userEvent.click(connectBtn)
  },
}

/**
 * Card with actions
 */
const onCancelAction = fn()
const onDeleteAction = fn()

export const WithActions: Story = {
  render: () => (
    <Card width="320px">
      <CardHeader>Confirm Action</CardHeader>
      <CardBody>
        <Text>Are you sure you want to proceed with this action? This cannot be undone.</Text>
      </CardBody>
      <CardFooter>
        <HStack gap={2} justify="flex-end" width="full">
          <Button variant="ghost" size="sm" onClick={onCancelAction}>
            Cancel
          </Button>
          <Button colorPalette="error" size="sm" onClick={onDeleteAction}>
            Delete
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    // Reset mocks to ensure clean state on each run
    onCancelAction.mockClear()
    onDeleteAction.mockClear()

    const canvas = within(canvasElement)

    // Verify confirmation dialog content
    await expect(canvas.getByText('Confirm Action')).toBeVisible()
    await expect(canvas.getByText(/Are you sure you want to proceed/i)).toBeVisible()

    // Verify action buttons
    const cancelBtn = canvas.getByRole('button', { name: /cancel/i })
    const deleteBtn = canvas.getByRole('button', { name: /delete/i })

    await expect(cancelBtn).toBeVisible()
    await expect(deleteBtn).toBeVisible()

    // Test cancel interaction
    await userEvent.click(cancelBtn)
    await expect(onCancelAction).toHaveBeenCalledTimes(1)

    // Test delete interaction
    await userEvent.click(deleteBtn)
    await expect(onDeleteAction).toHaveBeenCalledTimes(1)
  },
}

/**
 * Interactive test
 */
export const Interactive: Story = {
  args: {
    children: (
      <>
        <CardHeader data-testid="card-header">Test Card</CardHeader>
        <CardBody data-testid="card-body">Card content for testing</CardBody>
      </>
    ),
    'data-testid': 'test-card',
    width: '300px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify card renders
    const card = canvas.getByTestId('test-card')
    await expect(card).toBeInTheDocument()

    // Verify header
    const header = canvas.getByTestId('card-header')
    await expect(header).toHaveTextContent('Test Card')

    // Verify body
    const body = canvas.getByTestId('card-body')
    await expect(body).toHaveTextContent('Card content for testing')
  },
}

/**
 * Card keyboard navigation test
 */
const onFirstClick = fn()
const onSecondClick = fn()
const onThirdClick = fn()

export const KeyboardNavigation: Story = {
  render: () => (
    <Card width="320px">
      <CardHeader>Keyboard Test</CardHeader>
      <CardBody>
        <Text>Test keyboard navigation through card actions</Text>
      </CardBody>
      <CardFooter>
        <HStack gap={2}>
          <Button size="sm" onClick={onFirstClick}>
            First
          </Button>
          <Button size="sm" onClick={onSecondClick}>
            Second
          </Button>
          <Button size="sm" onClick={onThirdClick}>
            Third
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    // Reset mocks to ensure clean state on each run
    onFirstClick.mockClear()
    onSecondClick.mockClear()
    onThirdClick.mockClear()

    const canvas = within(canvasElement)

    // Tab to first button
    await userEvent.tab()
    const firstBtn = canvas.getByRole('button', { name: /first/i })
    await expect(firstBtn).toHaveFocus()

    // Press Enter on first button
    await userEvent.keyboard('{Enter}')
    await expect(onFirstClick).toHaveBeenCalledTimes(1)

    // Tab to second button
    await userEvent.tab()
    const secondBtn = canvas.getByRole('button', { name: /second/i })
    await expect(secondBtn).toHaveFocus()

    // Press Space on second button
    await userEvent.keyboard(' ')
    await expect(onSecondClick).toHaveBeenCalledTimes(1)

    // Tab to third button
    await userEvent.tab()
    const thirdBtn = canvas.getByRole('button', { name: /third/i })
    await expect(thirdBtn).toHaveFocus()
  },
}
