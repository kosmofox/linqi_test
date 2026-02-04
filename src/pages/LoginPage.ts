import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../configs/urls";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator(
      'input[type="text"], input[name="Username"], input[data-automation-id="login-username"]',
    );

    this.passwordInput = page.locator(
      'input[type="password"], input[name="Password"], input[data-automation-id="login-password"]',
    );

    this.submitButton = page.locator(
      'button[name="button"], button[value="login"], button:has-text("Log in")',
    );

    this.errorMessage = page.locator(
      'div[data-automation-id="login-invalid-data"]',
    );
  }

  async goto() {
    await this.page.goto(urls.login);
    await this.verifyLoginPageLoaded();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async verifyErrorMessage(expectedMessage?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedMessage) {
      await expect(this.errorMessage).toContainText(expectedMessage);
    }
  }
}
