import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { HomePage } from "../page-object/HomePage";
import { SupportPage } from "../page-object/SupportPage";
import { JoinPage } from "../page-object/JoinPage";
import { RegisterPage } from "../page-object/RegisterPage";


let homePage;
let supportPage;
let joinPage;
let registerPage;

const name = faker.person.firstName();
const email = faker.internet.email();
const password = "ABchj25@@sjWS!"
const zipCode = faker.address.zipCode();
const streetAddress = faker.address.streetAddress();
const city = faker.address.city();

test.beforeEach(async ({ page }) => {
  supportPage = new SupportPage(page);
  homePage = new HomePage(page);
  joinPage = new JoinPage(page);
  registerPage = new RegisterPage(page);
  await homePage.goTo();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
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
  await supportPage.submitSupport();
});

test("Try creating support request with invalid data", async ({ page }) => {
  await homePage.goToSupportPage();
  await supportPage.validateFields();
  await supportPage.fillFields(' ', ' ', ' ');
  await supportPage.tapCheckbox();
  await supportPage.validateErrorMessages();
});

test('Create a full account', async ({ page }) => {
  await homePage.goToJoinPage();
  await joinPage.signUpWithEmail();
  await registerPage.createAccountWithValidData(name, email, password);
  await page.waitForTimeout(2000);
  await registerPage.fillYourParticulars();
  await page.waitForTimeout(4000);
  await registerPage.fillTimeForYourAddress(zipCode, streetAddress, city);
  await page.waitForTimeout(4000);
  await registerPage.fillTellUsAboutYourLifeStyle();
  await page.waitForTimeout(4000);
  await registerPage.fillCategories();
  await registerPage.validateConnectSocial()
});