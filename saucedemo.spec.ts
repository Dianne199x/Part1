import { test, expect, Page } from '@playwright/test';

test.describe('SauceDemo UI Flows', () => {

  // Happy Path: Complete Checkout
  test('should complete a purchase successfully', async ({ page }: { page: Page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);

    // Add to Cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Checkout
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    
    // Assert Overview
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await page.click('[data-test="finish"]');

    // Assert Completion
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order');
  });

  // Unhappy Path: Locked Out User
  test('should show error for locked_out_user', async ({ page }: { page: Page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Assert Error Message
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});