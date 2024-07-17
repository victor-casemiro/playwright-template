import { expect } from "@playwright/test";


export class JoinPage {

    constructor(page) {
        this.page = page;
    }

    async signUpWithEmail() {
        await expect(this.page.getByRole('button', { name: 'Sign up with Email' })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Sign up with Email' }).click();
    }
    async createAccountWithValidData(name, email, password){
        //fill all necessary field
        await this.page.getByLabel('Your name').fill(name);
        await this.page.getByLabel('Email address').fill(email);
        await this.page.getByLabel('Password', { exact: true }). fill(password);
        await this.page.getByLabel('Repeat password').fill(password);
        //click in  checkBox
        await this.page.getByRole('checkbox').first().click();
        await this.page.getByRole('checkbox').nth(1).click(); //Optinal checkbox
        //verify if create my acount button is eneble and click it
        await expect(this.page.locator('div').filter({ hasText: /^Create my account$/ })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Create my account' }).dblclick();
    }
    async fillYourParticulars(){
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


   

}