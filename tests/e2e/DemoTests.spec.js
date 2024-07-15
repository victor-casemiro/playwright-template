import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // await page.setViewportSize({ width: 1920, height: 1080 }); // Assuming "desktop" viewport size is 1920x1080
  await page.setExtraHTTPHeaders({
    "CF-Access-Client-Id": "0188aeafcb0547ae968bff7333f18486.access",
    "CF-Access-Client-Secret":
      "f35c1c3cb656959552ef5ff4813086105c59662a4d87ffb47f19e10350f50eb5",
  });

  await page.goto("https://dev-htc-web.hometesterclub-dev.com/us/en/support");
});

test("Verificar navbar", async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Reviews' })).toHaveText('Reviews');
  await expect(page.getByRole('link', { name: 'Tests' })).toHaveText('Tests');
  await expect(page.getByRole('link', { name: 'Sign In!' })).toHaveText('Sign in!');
  await expect(page.locator('#header_faq_click')).toHaveText('FAQ');
  await expect(page.locator('#header_support_click')).toHaveText('Support'); // We're using locator because we need to specify the element's id
  await expect(page.locator('#header_join_now_click')).toHaveText('Join now'); // We're using locator because there are 2 elements with the same text on the page
});

test("create support with valid email", async ({ page }) => {
  //await expect(page.locator('#header_support_click')).toHaveText('Support').click(); // We're using locator because we need to specify the element's id
  await page.getByPlaceholder('What is your first name?').fill('Peter');
  await page.getByPlaceholder('Type your best email').fill('peter@test.com');
  await page.getByRole('checkbox').click();
  await page.locator('div').filter({ hasText: /^Submit$/ }).isEnabled
  await page.getByText('I\'m a brand or agency').isVisible();
  await page.getByPlaceholder('Questions, comments, high').fill('help me to test this').press('Enter');
  await page.locator('div').filter({ hasText: /^Submit$/ }).isEnabled


  
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
