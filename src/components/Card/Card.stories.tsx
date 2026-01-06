import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
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
}

/**
 * Card with actions
 */
export const WithActions: Story = {
  render: () => (
    <Card width="320px">
      <CardHeader>Confirm Action</CardHeader>
      <CardBody>
        <Text>Are you sure you want to proceed with this action? This cannot be undone.</Text>
      </CardBody>
      <CardFooter>
        <HStack gap={2} justify="flex-end" width="full">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button colorPalette="error" size="sm">
            Delete
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  ),
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
