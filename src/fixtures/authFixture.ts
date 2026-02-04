import { test as base, Page } from "@playwright/test";
import {
  LoginPage,
  DashboardPage,
  ProcessPage,
  ProcessCreatePage,
} from "../pages";
import { testUsers } from "../configs/users";
import { urls } from "../configs/urls";
import { generateRandomName } from "../utils/generateRandomName";

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: Page;
  processPage: ProcessPage;
  processCreatePage: ProcessCreatePage;
  randomProcessName: string;
};

export const test = base.extend<AuthFixtures>({
  randomProcessName: async ({}, use) => {
    const name = generateRandomName();
    await use(name);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  processPage: async ({ page }, use) => {
    const processPage = new ProcessPage(page);
    await use(processPage);
  },

  processCreatePage: async ({ page, randomProcessName }, use) => {
    const processCreatePage = new ProcessCreatePage(page);
    await use(processCreatePage);
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goto();

    await page.waitForURL(`${urls.login}*`);

    await loginPage.login(
      testUsers.validUser.username,
      testUsers.validUser.password,
    );

    await page.waitForURL(urls.dashboard);

    await dashboardPage.verifyDashboardLoaded();

    await use(page);
  },
});

export { expect } from "@playwright/test";
