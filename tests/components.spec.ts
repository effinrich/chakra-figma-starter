import { test, expect } from '@playwright/test'

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default')
  })

  test('renders correctly', async ({ page }) => {
    const button = page.getByRole('button', { name: /button/i })
    await expect(button).toBeVisible()
  })

  test('is clickable', async ({ page }) => {
    const button = page.getByRole('button', { name: /button/i })
    await button.click()
    // Button should still be visible after click
    await expect(button).toBeVisible()
  })

  test('matches visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('button-default.png')
  })
})

test.describe('Button Variants', () => {
  test('renders all variants', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--variants')

    await expect(page.getByRole('button', { name: /solid/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /outline/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /ghost/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /link/i })).toBeVisible()
  })
})

test.describe('Button Accessibility', () => {
  test('supports keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default')

    await page.keyboard.press('Tab')
    const button = page.getByRole('button')
    await expect(button).toBeFocused()
  })

  test('disabled button is not focusable', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled')

    const button = page.getByRole('button')
    await expect(button).toBeDisabled()
  })
})

test.describe('Card Component', () => {
  test('renders default card', async ({ page }) => {
    await page.goto('/iframe.html?id=components-card--default')

    await expect(page.getByText('Card Title')).toBeVisible()
  })

  test('renders all variants', async ({ page }) => {
    await page.goto('/iframe.html?id=components-card--variants')

    await expect(page.getByText('Elevated')).toBeVisible()
    await expect(page.getByText('Outline')).toBeVisible()
    await expect(page.getByText('Filled')).toBeVisible()
  })
})

test.describe('Input Component', () => {
  test('accepts user input', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--default')

    const input = page.getByRole('textbox')
    await input.fill('Hello World')
    await expect(input).toHaveValue('Hello World')
  })

  test('shows error state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-input--with-error')

    await expect(page.getByText(/please enter a valid email/i)).toBeVisible()
  })
})

test.describe('Responsive Design', () => {
  test('button renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/iframe.html?id=components-button--default')

    const button = page.getByRole('button')
    await expect(button).toBeVisible()
  })

  test('card renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/iframe.html?id=components-card--default')

    await expect(page.getByText('Card Title')).toBeVisible()
  })
})
