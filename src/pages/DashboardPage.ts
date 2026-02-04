import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../configs/urls";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly profileButton: Locator;
  readonly processButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator("h1", {
      hasText: "Create dashboard sequence",
    });
    this.profileButton = page.locator(
      'div[data-automation-id="mainNav-User-Profile"] button[type="button"]',
    );
    this.processButton = page.locator(
      'div[data-testid="mainNav-Prozess-Dashboard"] button[type="button"]',
    );
  }

  async goto() {
    await this.page.goto(urls.dashboard);
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(urls.dashboard);
    await expect(this.dashboardHeader).toBeVisible();
  }

  async navigateToProcess() {
    await this.processButton.click();
    await this.page.waitForURL(`${urls.process}*`);
  }
}
