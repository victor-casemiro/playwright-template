import { test, expect } from '@playwright/test';

test('Test Case 1518: Login - Nome de usuario valido + Senha valida', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
});

test('Test Case 1519: Login - Nome de usuario invalido + Senha valida', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
    await expect(page.locator('[data-test="title"]')).not.toBeVisible();
});

test('Test Case 1520: Login - Nome de usuario valido + Senha invalida', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('asecret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
    await expect(page.locator('[data-test="title"]')).not.toBeVisible();
});

test('Test Case 1521: Login - Em branco', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).not.toBeVisible();
    await expect(page.locator('[data-test="title"]')).not.toBeVisible();
});