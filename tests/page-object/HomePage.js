import { expect } from '@playwright/test';

export class HomePage {

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

    async goToSupportPage() {
        await this.page.locator('#header_support_click').click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.url()).toBe("https://dev-htc-web.hometesterclub-dev.com/us/en/support");
    }

    async validateNavbar() {
        await expect(this.page.getByRole('link', { name: 'Reviews' })).toHaveText('Reviews');
        await expect(this.page.getByRole('link', { name: 'Tests' })).toHaveText('Tests');
        await expect(this.page.getByRole('link', { name: 'Sign In!' })).toHaveText('Sign in!');
        await expect(this.page.locator('#header_faq_click')).toHaveText('FAQ');
        await expect(this.page.locator('#header_support_click')).toHaveText('Support'); // We're using locator because we need to specify the element's id
        await expect(this.page.locator('#header_join_now_click')).toHaveText('Join now'); // We're using locator because there are 2 elements with the same text on the page
    }

    async validateFooter() {
        await expect(this.page.getByLabel('Change Country')).toHaveText('Change Country');
        await expect(this.page.getByRole('link', { name: 'For Brands' })).toHaveText('For Brands');
        await expect(this.page.getByRole('link', { name: 'Disclosure' })).toHaveText('Disclosure');
        await expect(this.page.getByRole('link', { name: 'Privacy Policy' })).toHaveText('Privacy Policy');
        await expect(this.page.getByRole('link', { name: 'Terms of Use' })).toHaveText('Terms of Use');
        await expect(this.page.getByRole('link', { name: 'DMCA' })).toHaveText('DMCA');
        await expect(this.page.locator('#cookie_policy')).toHaveText('Cookie Policy');
        await expect(this.page.locator('#faq_footer')).toHaveText('FAQ');
        await expect(this.page.locator('#support_footer')).toHaveText('Support');
        await expect(this.page.locator('#brand_power_company')).toBeVisible();
        await expect(this.page.getByText('© 2024 The Brand Power')).toHaveText('© 2024 The Brand Power Company. All Rights Reserved.');
    }

    async goToJoinPage() {
        await this.page.locator('#header_join_now_click').click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.url()).toBe("https://dev-htc-web.hometesterclub-dev.com/us/en/account/join");
    }

}