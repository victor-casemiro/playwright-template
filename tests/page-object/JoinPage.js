import { expect } from "@playwright/test";


export class JoinPage {

    constructor(page) {
        this.page = page;
    }

    async signUpWithEmail() {
        await expect(this.page.getByRole('button', { name: 'Sign up with Email' })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Sign up with Email' }).click();
    }


}