const puppeteer = require('puppeteer')

const signinUrl = "file:///D:/Playground/Fast-Food-Fast/UI/signup.html";

const userData =
{
    email:"Admin",
    upassword:"Admin"
}

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
});
  
beforeEach(() => {
    jest.setTimeout(50000)
})

afterAll(() => {
    browser.close();
});

describe("User login", () => {
    test("Test user login with wrong password", async () => {
        await page.goto(signinUrl);
        await page.waitForSelector(".form");
        await page.click("#username");
        await page.type("#username", userData.email);
        await page.click("#password");
        await page.type("#password", userData.upassword);
        await page.click(".btn.btn-green");
        await page.waitFor(5000);
        const divcontent = await page.evaluate(() => document.querySelector('#login-alert').textContent);
        expect(divcontent).toEqual('Could not verify, invalid credentials check your username or password')
    });
})