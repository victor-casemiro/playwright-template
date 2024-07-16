import { test } from "@playwright/test";
import { HomePage } from "../page-object/HomePage";
import { SupportPage } from "../page-object/SupportPage";

let homePage;
let supportPage;

test.beforeEach(async ({ page }) => {
  supportPage = new SupportPage(page);
  homePage = new HomePage(page);
  await homePage.goTo();
});

test("Verify navbar", async () => {
  await homePage.validateNavbar();
});

test("Verify footer", async () => {
  await homePage.validateFooter();
});

test("Create support request with valid data", async ({ page }) => {
  await homePage.goToSupportPage();
  await supportPage.validateFields()
  await supportPage.fillFields('Peter', 'peter@test.com', 'help me to test this');
  await supportPage.tapCheckbox();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await supportPage.submitSupport();
});

test("Try creating support request with invalid data", async ({ page }) => {
  await homePage.goToSupportPage();
  await supportPage.validateFields()
  await supportPage.fillFields(' ', ' ', ' ');
  await supportPage.tapCheckbox();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await supportPage.validateErrorMessages();
});