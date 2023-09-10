import { Locator, Page, expect } from "@playwright/test";
import { User } from "../interfaces/user";

export class LoginPage {
  readonly _page: Page;
  readonly _loginField: Locator;

  constructor(page: Page) {
    this._page = page;
    this._loginField = page.getByTestId("login-field");
  }

  async visit() {
    await this._page.goto("https://twittah.web.app");
    await this.shouldBeDisplay();
  }

  async shouldBeDisplay(){
    await expect(this._page.getByTestId("app-name")).toBeVisible();
    await expect(this._page.getByTestId("app-name")).toHaveText("Twittah!");
  }

  async loginWith(user: User) {
    await this._page.getByTestId("login-field").fill(user.username);
    await this._page.getByTestId("password-field").fill(user.password);
    await this._page.getByTestId("login-button").click();
  }
}
