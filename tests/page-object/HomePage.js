const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
    }

    async goTo() {
        await this.page.setExtraHTTPHeaders({
            "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
            "CF-Access-Client-Secret":
                "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5",
        });
        await this.page.goto("https://dev-htc-web.hometesterclub-dev.com/us/en");
    }

    async validateNavbar() {
        await expect(this.page.getByRole('link', { name: 'Reviews' })).toHaveText('Reviews');
        await expect(this.page.getByRole('link', { name: 'Tests' })).toHaveText('Tests');
        await expect(this.page.getByRole('link', { name: 'Sign In!' })).toHaveText('Sign in!');
        await expect(this.page.locator('#header_faq_click')).toHaveText('FAQ');
        await expect(this.page.locator('#header_support_click')).toHaveText('Support'); // We're using locator because we need to specify the element's id
        await expect(this.page.locator('#header_join_now_click')).toHaveText('Join now'); // We're using locator because there are 2 elements with the same text on the page
    }

};