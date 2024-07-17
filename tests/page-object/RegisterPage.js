import { expect } from "@playwright/test";


export class RegisterPage {

    constructor(page) {
        this.page = page;
    }

    async fillYourParticulars() {
        //fill lastname field
        await this.page.getByRole('textbox').nth(1).click();
        await this.page.getByRole('textbox').nth(1).fill("test");
        //choose gender
        await this.page.getByRole('button', { name: 'Rather not say' }).click();
        //select birthday
        await this.page.locator('.MuiInputAdornment-root > .MuiButtonBase-root').click();
        await this.page.getByRole('button', { name: '2004' }).click();
        await this.page.getByRole('button', { name: 'jan' }).click();
        //continue to next step
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async createAccountWithValidData(name, email, password) {
        //fill all necessary field
        await this.page.getByLabel('Your name').fill(name);
        await this.page.getByLabel('Email address').fill(email);
        await this.page.getByLabel('Password', { exact: true }).fill(password);
        await this.page.getByLabel('Repeat password').fill(password);
        //click in  checkBox
        await this.page.getByRole('checkbox').first().click();
        await this.page.getByRole('checkbox').nth(1).click(); //Optinal checkbox
        //verify if create my acount button is eneble and click it
        await expect(this.page.locator('div').filter({ hasText: /^Create my account$/ })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Create my account' }).dblclick();
    }

    async fillTimeForYourAddress(zipCode, streetAddress, city) {
        await this.page.getByRole('textbox').first().fill(zipCode);
        await this.page.getByRole('textbox').nth(1).fill(streetAddress);
        await this.page.getByRole('textbox').nth(2).fill(city);
        await this.page.getByRole('button').nth(1).click();
        await this.page.getByRole('option', { name: 'GEORGIA' }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async fillTellUsAboutYourLifeStyle() {
        await this.page.getByRole('button', { name: 'Please specify' }).first().click();
        await this.page.getByRole('option', { name: 'I prefer not to answer' }).click();
        await this.page.getByRole('checkbox').nth(2).click();
        await this.page.getByRole('button', { name: 'Please specify' }).first().click();
        await this.page.getByRole('option', { name: 'I prefer not to answer' }).click();
        await this.page.getByRole('button', { name: 'Please specify' }).first().click();
        await this.page.getByRole('option', { name: '-25%' }).click();
        await this.page.getByRole('button', { name: 'Please specify' }).first().click();
        await this.page.getByRole('option', { name: 'Other' }).click();
        await this.page.getByRole('button', { name: 'Please specify' }).first().click();
        await this.page.getByRole('option', { name: 'I prefer not to answer' }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async fillCategories() {
        await this.page.getByRole('button', { name: 'Baby & toddler' }).click();
        await this.page.locator('div').filter({ hasText: /^Baby care$/ }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async validateConnectSocial() {
        await expect(this.page.getByRole('heading', { name: 'Connect your social networks' })).toBeVisible();
        await expect(this.page.locator('div').filter({ hasText: /^Associated with Facebook$/ }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('checkbox')).toBeChecked({ checked: false });
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
}