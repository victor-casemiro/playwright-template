import { test, expect } from "@playwright/test";
import { HomePage } from "../page-object/HomePage";

let homePage;
test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  homePage.goTo();
});

test("Verify navbar", async ({ page }) => {
  homePage = new HomePage(page);
  homePage.validateNavbar()
});

test("Verify footer", async ({ page }) => {
  await expect(page.getByLabel('Change Country')).toHaveText('Change Country');
  await expect(page.getByRole('link', { name: 'For Brands' })).toHaveText('For Brands');
  await expect(page.getByRole('link', { name: 'Disclosure' })).toHaveText('Disclosure');
  await expect(page.getByRole('link', { name: 'Privacy Policy' })).toHaveText('Privacy Policy');
  await expect(page.getByRole('link', { name: 'Terms of Use' })).toHaveText('Terms of Use');
  await expect(page.getByRole('link', { name: 'DMCA' })).toHaveText('DMCA');
  await expect(page.locator('#cookie_policy')).toHaveText('Cookie Policy');
  await expect(page.locator('#faq_footer')).toHaveText('FAQ');
  await expect(page.locator('#support_footer')).toHaveText('Support');
  await expect(page.locator('#brand_power_company')).toBeVisible();
  await expect(page.getByText('© 2024 The Brand Power')).toHaveText('© 2024 The Brand Power Company. All Rights Reserved.');
});

test("create support request with valid datas", async ({ page }) => {
  await page.locator('#header_support_click').click();
  await page.waitForTimeout(2000);
  await expect(page.url()).toBe("https://dev-htc-web.hometesterclub-dev.com/us/en/support");
  //check elements on support page
  await page.getByRole('heading', { name: 'Anything we can help with?' }).isVisible();
  await page.getByText('Did we answer your question?').isVisible();
  await page.getByText('Best contact email *').isVisible();
  await page.getByText('I\'m a brand or agency').isVisible();
  await page.getByText('Anything we can help with? *').isVisible();
  await page.getByRole('button', { name: 'Submit' }).isDisabled();
  //fill necesessary field
  await page.getByPlaceholder('What is your first name?').fill('Peter');
  await page.getByPlaceholder('Type your best email').fill('peter@test.com');
  await page.getByPlaceholder('Questions, comments, high').fill('help me to test this');
  //click in I\'m a brand or agency box (Optional)
  await page.getByRole('checkbox').click();
  await page.getByText('I\'m a brand or agency').isVisible();
  //accept all coockies
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  //submit the support
  await page.getByRole('button', { name: 'Submit' }).isEnabled();
  await page.getByRole('button', { name: 'Submit' }).click();
  //validate if success modal is visible
  await page.getByText('Success').isVisible();
  await page.getByRole('button', { name: 'Got it' }).click();
});