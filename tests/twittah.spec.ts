import { test, expect, type Page } from "@playwright/test";
import { userData } from "../fixtures/users";
import { LoginPage } from "../page/login-page";
import { HomePage } from "../page/home-page";

test.describe("test", () => {
  const postMessage = "ทีนี้ก็ว้าวุ่นเลย";

  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.loginWith(userData)
  });

    test("user post for Twittah!", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await homePage.shouldBeDisplay();
    await homePage.postTwittah(postMessage);
    await homePage.shouldBeSeePostForFirstPage(postMessage);
    await homePage.logout();
    await loginPage.shouldBeDisplay();
  });
});
