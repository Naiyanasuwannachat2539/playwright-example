import { test, type Page } from "@playwright/test";
import { inactiveUsers, userData } from "../fixtures/users";
import { LoginPage } from "../page/login-page";
import { HomePage } from "../page/home-page";

test.describe("post twittah success", () => {
  const postMessage = "ทีนี้ก็ว้าวุ่นเลย";
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.loginWith(userData);
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
test.describe("login fail", () => {
  // let loginPage: LoginPage;

  for (const inactiveUser of inactiveUsers) {
    test(`login invalid user: ${inactiveUser.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.visit();
      await loginPage.loginWith(inactiveUser);
      await loginPage.shouldBeDisplayErrorMessage(inactiveUser.error_message || "");
    });
  }
});
