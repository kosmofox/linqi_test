import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../configs/urls";

export class ProcessPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('h3:has-text("Manage processes")');

    this.createButton = page.locator(
      'button[data-automation-id="processList-addProcess-click"]',
    );
  }

  async goto() {
    await this.page.goto(urls.process);
  }

  async verifyProcessPageLoaded() {
    await expect(this.page).toHaveURL(new RegExp(`${urls.process}`));
    await expect(this.pageTitle).toBeVisible();
  }

  async verifyCreateButtonVisible() {
    await expect(this.createButton).toBeVisible();
    await expect(this.createButton).toBeEnabled();
  }

  async clickCreateButton() {
    await this.createButton.click();
  }

  async getPageTitle(): Promise<string> {
    return (await this.pageTitle.textContent()) || "";
  }
}
