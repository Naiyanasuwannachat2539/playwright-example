import { Locator, Page, expect } from "@playwright/test";
import { app } from "../fixtures/app";

export class HomePage {
  readonly _page: Page;
  readonly _menuHome: Locator;
  readonly _menuProfile: Locator;
  readonly _menuSignout: Locator;
  readonly _accountLabel: Locator;
  readonly _messageField: Locator;
  readonly _postButton: Locator;

  constructor(page) {
    this._page = page;
    this._menuHome = page.getByTestId("menu-home");
    this._menuProfile = page.getByTestId("menu-profile");
    this._menuSignout = page.getByTestId("menu-signout");
    this._accountLabel = page.getByTestId("user-profile-login-name");
    this._messageField = page.getByTestId("message-field");
    this._postButton = page.getByTestId("post-button");
  }

  async shouldBeDisplay() {
    await expect(this._accountLabel).toHaveText(/@bancha/);
    await expect(this._menuHome).toHaveText(/หน้าแรก/);
    await expect(this._menuProfile).toHaveText(/โปรไฟล์/);
    await expect(
      this._page.getByPlaceholder("มีอะไรน่าสนใจบ้าง?!")
    ).toBeVisible();
  }

  async postTwittah(postMessage) {
    await this._messageField.click();
    await this._messageField.fill(postMessage);
    await this._postButton.click();
  }

  async shouldBeSeePostForFirstPage(postMessage) {
    await this._page.waitForTimeout(3);
    await this._page.getByText(postMessage).first().isVisible();
  }

  async logout() {
    await this._menuSignout.click();
    await expect(this._page).toHaveURL(app.url);
  }
}
