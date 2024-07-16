import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  //await page.setViewportSize({ width: 1920, height: 1080 }); // Assuming "desktop" viewport size is 1920x1080
  await page.setExtraHTTPHeaders({
    "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
    "CF-Access-Client-Secret":
      "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5",
  });
  await page.goto("https://dev-htc-web.hometesterclub-dev.com/us/en");
});

test("Verificar navbar", async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Reviews' })).toHaveText('Reviews');
  await expect(page.getByRole('link', { name: 'Tests' })).toHaveText('Tests');
  await expect(page.getByRole('link', { name: 'Sign In!' })).toHaveText('Sign in!');
  await expect(page.locator('#header_faq_click')).toHaveText('FAQ');
  await expect(page.locator('#header_support_click')).toHaveText('Support'); // We're using locator because we need to specify the element's id
  await expect(page.locator('#header_join_now_click')).toHaveText('Join now'); // We're using locator because there are 2 elements with the same text on the page
});

test("Verificar footer", async ({ page }) => {
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



test("try create support with invalid datas", async ({ page }) => {
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
  await page.getByPlaceholder('What is your first name?').fill(' ');
  await page.getByPlaceholder('Type your best email').fill(' ');
  await page.getByPlaceholder('Questions, comments, high').fill(' ');
  //click in I\'m a brand or agency box (Optional)
  await page.getByRole('checkbox').click();
  await page.getByText('I\'m a brand or agency').isVisible();
  //accept all coockies
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  //verify the submit botton
  await page.getByRole('button', { name: 'Submit' }).isDisabled();
  //validate message error
  await page.getByText('This format is invalid').isVisible();
  await page.getByText('You must enter at least one letter or one number').first().isVisible(); // name field error
  await page.getByText('You must enter at least one letter or one number').nth(1).isVisible(); // description field error
});
// ------------------------------------------------------------------
// test("Verificar navbar", async ({ page }) => {
//     await expect(page.locator('MuiStack-root mui-style-j7qwjs > a')).toHaveText('Avaliações');
//     await expect(page).toHaveText('text=Testes');
//     await expect(page).toHaveText('text=Dúvidas');
//     await expect(page).toHaveText('text=Suporte');class="MuiStack-root mui-style-j7qwjs"
// });

// test("Verificar botões de Login", async ({ page }) => {
//     await expect(page).toHaveText('text=Entrar!');
//     await expect(page).toHaveText('text=Inscreva-se');
// });

//     test("Verificar pagina Home", async ({ page }) => {
//         await expect(page.url()).toBe("https://staging-htc-web.hometesterclub-dev.com/br/pt");
//     });

//     test("Verificar pagina de Testes", async ({ page }) => {
//         await page.click('text=Testes');
//         await expect(page.url()).toBe("https://staging-htc-web.hometesterclub-dev.com/br/pt/test");
//     });

//     test("Verificar pagina de Duvidas", async ({ page }) => {
//         await page.click('text=Dúvidas');
//         await expect(page.url()).toBe("https://staging-htc-web.hometesterclub-dev.com/br/pt/faq");
//     });

//     test("Verificar pagina de Suporte", async ({ page }) => {
//         await page.click('text=Suporte');
//         await expect(page.url()).toBe("https://staging-htc-web.hometesterclub-dev.com/br/pt/support");
//     });
// });

// test.describe("Cadastro", () => {
//     test.beforeEach(async ({ page }) => {
//         await page.setViewportSize({ width: 1920, height: 1080 }); // Assuming "desktop" viewport size is 1920x1080
//         await page.setExtraHTTPHeaders({
//             "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
//             "CF-Access-Client-Secret": "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5"
//         });

//         await page.goto("https://dev-htc-web.hometesterclub-dev.com/br/pt");
//     });

//     test.only("Verificar Preenchimento de Cadastro", async ({ page }) => {
//         await page.click('#header_join_now_click');
//         await page.click('text=Registre-se com e-mail');

//         // Fill form fields
//         await page.fill('.mui-style-51k1j > :nth-child(1) > .MuiStack-root > .MuiFormControl-root', "Joao Vitor");
//         await page.keyboard.press('Tab');
//         await page.fill('.mui-style-51k1j > :nth-child(2) > .MuiStack-root > .MuiFormControl-root', `${Date.now()}@provider.com`);
//         await page.keyboard.press('Tab');
//         await page.fill(':nth-child(3) > .mui-style-1uhxzi9 > .MuiStack-root > .MuiFormControl-root', "123Senh@123");
//         await page.keyboard.press('Tab');
//         await page.fill(':nth-child(4) > .mui-style-1uhxzi9 > .MuiStack-root > .MuiFormControl-root', "123Senh@123");
//         await page.keyboard.press('Tab');
//         await page.click('.mui-style-maj8m0 > .MuiStack-root > .MuiButtonBase-root > .PrivateSwitchBase-input');
//         await page.click('.mui-style-14wxe9o');

//         await page.fill('div:nth-child(1) > main > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div', "Vitor David Prates");
//         await page.click('text=Masculino');
//         await page.click('.MuiInputAdornment-root > .MuiButtonBase-root');
//         await page.click('text=1996');
//         await page.click('text=abr');
//         await page.click('text=Continuar');

//         await page.fill('input[autocomplete="postal-code"]', '08560500');
//         await page.click('text=Verificar CEP');
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("nome da rua");
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("1234");
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("casa");
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("bairro");
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("cidade");
//         await page.keyboard.press('Tab');
//         await page.keyboard.press('Tab');
//         await page.keyboard.type("12345678912");
//         await page.click('div[tabindex="0"][role="button"][aria-expanded="false"][aria-haspopup="listbox"].MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.mui-style-xrcvti');
//         await page.click('text=Minas Gerais');
//         await page.click('text=Continuar');

//         await page.click(':nth-child(1) > .mui-style-16t69y4 > .MuiInputBase-root > .MuiSelect-select > .MuiTypography-root');
//         await page.click('.MuiList-root > [tabindex="0"]');
//         await page.click(':nth-child(3) > .mui-style-elwgtb > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input');
//         await page.keyboard.press('Tab');
//         await page.click('text=Prefiro não dizer');
//         await page.keyboard.press('Tab');
//         await page.click('text=75%+');
//         await page.keyboard.press('Tab');
//         await page.click('text=Menos de 2.000 seguidores');
//         await page.click('text=Continuar');

//         await page.click('text=Casa em geral');
//         await page.click('text=Cuidados com o Ar');
//         await page.click('text=Purificadores de ar');
//         await page.click('text=Continuar');

//         await page.click('text=Continuar');

//         await expect(page.url()).toContain('https://dev-htc-web.hometesterclub-dev.com/br/pt/feed');
//         // await expect(page).toHaveText('text=Olá, Joao Vitor');
//     });
