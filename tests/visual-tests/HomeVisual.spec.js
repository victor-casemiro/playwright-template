import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    // await page.setViewportSize({ width: 1920, height: 1080 }); // Assuming "desktop" viewport size is 1920x1080
    await page.setExtraHTTPHeaders({
        "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
        "CF-Access-Client-Secret":
            "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5",
    });

    await page.goto("https://dev-htc-web.hometesterclub-dev.com/us/en");
});

test('Top of Home page should be equals as screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('FreshHomePage.png', { maxDiffPixels: 500 });
});


test('Top of Home page should be equals as screenshot2', async ({ page }) => {
    await page.locator('div:nth-child(3) > div:nth-child(2) > div > div > div').scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot('ViewAll.png', { maxDiffPixels: 500 });
});