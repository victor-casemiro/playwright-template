import { expect } from '@playwright/test';

export class SupportPage {

    constructor(page) {
        this.page = page;
    }

    async validateFields() {
        await expect(this.page.getByRole('heading', { name: 'Anything we can help with?' })).toBeVisible();
        await expect(this.page.getByText('Did we answer your question?')).toBeVisible();
        await expect(this.page.getByText('Best contact email *')).toBeVisible();
        await expect(this.page.getByText('I\'m a brand or agency')).toBeVisible();
        await expect(this.page.getByText('Anything we can help with? *')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeDisabled();
    }

    async fillFields(name, email, question) {
        await this.page.getByPlaceholder('What is your first name?').fill(name);
        await this.page.getByPlaceholder('Type your best email').fill(email);
        await this.page.getByPlaceholder('Questions, comments, high').fill(question);
    }

    async tapCheckbox() {
        await this.page.getByRole('checkbox').click();
        await expect(this.page.getByText('I\'m a brand or agency')).toBeVisible();
    }

    async submitSupport() {
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeEnabled();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByRole('heading', { name: 'Success' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Got it' }).click();
    }

    async validateErrorMessages() {
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeDisabled();
        await expect(this.page.getByText('This format is invalid')).toBeVisible();
        await expect(this.page.getByText('You must enter at least one letter or one number').first()).toBeVisible(); // name field error
        await expect(this.page.getByText('You must enter at least one letter or one number').nth(1)).toBeVisible(); // description field error
    }
}