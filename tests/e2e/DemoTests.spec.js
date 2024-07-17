import { test } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { HomePage } from "../page-object/HomePage";
import { SupportPage } from "../page-object/SupportPage";
import { JoinPage } from "../page-object/JoinPage";


let homePage;
let supportPage;
let joinPage;

const name = faker.person.firstName(); 
const lastName = faker.person.lastName();
const email = faker.internet.email(); 
var password = "ABchj25@@sjWS!"



test.beforeEach(async ({ page }) => {
  supportPage = new SupportPage(page);
  homePage = new HomePage(page);
  joinPage = new JoinPage(page);
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
  await supportPage.validateFields();
  await supportPage.fillFields(' ', ' ', ' ');
  await supportPage.tapCheckbox();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await supportPage.validateErrorMessages();
});

test('create a account', async ({page}) => {
  await homePage.goToJoinPage();
  await joinPage.signUpWithEmail();
  await joinPage.createAccountWithValidData(name, email, password);
  await page.waitForTimeout(2000);
  await joinPage.fillYourParticulars();

});