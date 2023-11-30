const puppeteer = require('puppeteer');
var helpers = require('./selectors');
var userinput = require('./auth');
let page;
let browser;

class basePage {

    async build() {
        browser = await puppeteer.launch({headless: 'new'});
        page = await browser.newPage();
        await page.goto(helpers.baseUrl, { waitUntil: 'networkidle0' });
    }

    async closeAll() {
        await browser.close();
    }

    async getApiKey() {
        const input = helpers.apiKeyInput;
        const nameText = await page.waitForSelector(input);
        return await page.evaluate(x => x.value, nameText);
    }

    async login() {
       let emailid = await page.waitForSelector(helpers.emailInput);
       await emailid.click();
       await emailid.type(userinput.username);
       let password = await page.waitForSelector(helpers.passwordInput);
       await password.click();
       await password.type(userinput.password);
       let button = await page.waitForSelector(helpers.signInButton);
       await button.click();
       await page.waitForNavigation();
    }


}
module.exports = basePage;