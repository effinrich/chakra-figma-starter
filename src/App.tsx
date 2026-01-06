import { ChakraProvider, Box, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react'
import { system } from './theme'
import { Button, Card, CardHeader, CardBody, CardFooter, Input, InputField } from './components'

function App() {
  return (
    <ChakraProvider value={system}>
      <Box minH="100vh" bg="gray.50" py={10}>
        <Container maxW="container.lg">
          <VStack gap={10} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Heading size="2xl" mb={2}>
                Chakra UI + Figma Sync
              </Heading>
              <Text color="gray.600">
                Design tokens synced from Chakra UI Figma Kit v3
              </Text>
            </Box>

            {/* Buttons Section */}
            <Card>
              <CardHeader>
                <Heading size="lg">Buttons</Heading>
              </CardHeader>
              <CardBody>
                <VStack gap={4} align="stretch">
                  <HStack gap={4} wrap="wrap">
                    <Button variant="solid">Solid</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </HStack>
                  <HStack gap={4} wrap="wrap">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </HStack>
                  <HStack gap={4} wrap="wrap">
                    <Button colorPalette="primary">Primary</Button>
                    <Button colorPalette="success">Success</Button>
                    <Button colorPalette="error">Error</Button>
                    <Button colorPalette="warning">Warning</Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Cards Section */}
            <Card>
              <CardHeader>
                <Heading size="lg">Cards</Heading>
              </CardHeader>
              <CardBody>
                <HStack gap={4} align="stretch" wrap="wrap">
                  <Card variant="elevated" flex={1} minW="200px">
                    <CardHeader>Elevated</CardHeader>
                    <CardBody>
                      <Text fontSize="sm">Card with shadow</Text>
                    </CardBody>
                  </Card>
                  <Card variant="outline" flex={1} minW="200px">
                    <CardHeader>Outline</CardHeader>
                    <CardBody>
                      <Text fontSize="sm">Card with border</Text>
                    </CardBody>
                  </Card>
                  <Card variant="filled" flex={1} minW="200px">
                    <CardHeader>Filled</CardHeader>
                    <CardBody>
                      <Text fontSize="sm">Card with background</Text>
                    </CardBody>
                  </Card>
                </HStack>
              </CardBody>
            </Card>

            {/* Inputs Section */}
            <Card>
              <CardHeader>
                <Heading size="lg">Inputs</Heading>
              </CardHeader>
              <CardBody>
                <VStack gap={4} align="stretch" maxW="400px">
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    helperText="We'll never share your email"
                  />
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    isRequired
                  />
                  <InputField
                    label="Username"
                    placeholder="johndoe"
                    isInvalid
                    errorMessage="Username is already taken"
                  />
                  <HStack gap={4}>
                    <Input placeholder="Small" size="sm" />
                    <Input placeholder="Medium" size="md" />
                    <Input placeholder="Large" size="lg" />
                  </HStack>
                </VStack>
              </CardBody>
              <CardFooter>
                <Button colorPalette="primary">Submit</Button>
              </CardFooter>
            </Card>

            {/* Footer */}
            <Box textAlign="center" py={4}>
              <Text fontSize="sm" color="gray.500">
                Run <code>npm run storybook</code> to view component documentation
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
