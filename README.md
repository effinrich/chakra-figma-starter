# Chakra UI + Figma Sync Starter

A production-ready React component library with design tokens synced from the **Chakra UI Figma Kit v3**, complete with Storybook documentation, interaction tests, Playwright E2E tests, and Chromatic visual review workflows.

## 🎨 Figma Source

Design tokens are synced from:
**[Chakra UI - Figma Kit v3](https://www.figma.com/design/ZUi5xVkIKAokS1nS78jN1l/Chakra-UI----Figma-Kit--v3)**

## ✨ Features

- **Chakra UI v3** - Latest version with modern theming
- **Figma Token Sync** - Automated design token extraction
- **Storybook 8** - Interactive component documentation
- **Interaction Tests** - Built into Storybook stories
- **Playwright E2E** - Cross-browser testing
- **Chromatic CI/CD** - Visual regression testing
- **TypeScript** - Full type safety
- **Vite** - Fast development and builds

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

## 📦 Project Structure

```
├── .github/workflows/     # CI/CD workflows
│   ├── chromatic.yml      # Visual testing
│   └── figma-sync.yml     # Automated token sync
├── .storybook/            # Storybook configuration
├── scripts/               # Sync scripts
├── src/
│   ├── components/        # React components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Input/
│   ├── theme/             # Chakra UI theme & tokens
│   └── lib/               # Utilities
├── tests/                 # Playwright E2E tests
└── package.json
```

## 🎭 Components

### Button

```tsx
import { Button } from '@/components'

<Button variant="solid" colorPalette="primary" size="md">
  Click me
</Button>
```

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components'

<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Input

```tsx
import { InputField } from '@/components'

<InputField
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>
```

## 🔄 Syncing Figma Tokens

### Manual Sync

```bash
# Set your Figma access token
export FIGMA_ACCESS_TOKEN=your-token

# Run sync script
npm run sync:tokens
```

### Automated Sync

The `figma-sync.yml` workflow runs daily and creates PRs when tokens change.

Required GitHub Secrets:

- `FIGMA_ACCESS_TOKEN` - Your Figma personal access token
- `FIGMA_FILE_KEY` - The Figma file key (default: `ZUi5xVkIKAokS1nS78jN1l`)
- `CHROMATIC_PROJECT_TOKEN` - Your Chromatic project token

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm run test           # Run tests
npm run test:ui        # Interactive UI
npm run test:coverage  # With coverage
```

### Storybook Interaction Tests

```bash
npm run storybook              # Start Storybook
npm run test:storybook         # Run interaction tests
```

### Playwright E2E Tests

```bash
npm run test:e2e       # Run E2E tests
```

## 📚 Storybook

Start Storybook to browse components:

```bash
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
```

## 🎨 Chromatic

Publish to Chromatic for visual review:

```bash
# Set your Chromatic token
export CHROMATIC_PROJECT_TOKEN=your-token

npm run chromatic
```

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build static Storybook |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run chromatic` | Publish to Chromatic |
| `npm run sync:tokens` | Sync Figma tokens |

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
FIGMA_ACCESS_TOKEN=your-figma-token
FIGMA_FILE_KEY=The Figma file key
CHROMATIC_PROJECT_TOKEN=your-chromatic-token
```

### Customizing Theme

Edit `src/theme/index.ts` to customize the theme:

```typescript
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: '#your-brand-color' },
        },
      },
    },
  },
})
```

## 📄 License

MIT

---

Built with ❤️ using the [chakra-figma-sync skill](https://github.com/anthropics/skills)
