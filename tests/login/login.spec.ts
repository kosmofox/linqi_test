import { test, expect } from "../../src/fixtures/authFixture";
import { testUsers } from "../../src/configs/users";
import { urls } from "../../src/configs/urls";

test.describe("User Authentication Flow", () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test("should redirect unauthenticated user to login page", async ({
    page,
    loginPage,
  }) => {
    await page.waitForURL(`${urls.login}*`);
    await loginPage.verifyLoginPageLoaded();
  });

  test("should successfully login with valid credentials and redirect to dashboard", async ({
    page,
    loginPage,
    dashboardPage,
  }) => {
    await page.waitForURL(`${urls.login}*`);

    await loginPage.verifyLoginPageLoaded();

    await loginPage.login(
      testUsers.validUser.username,
      testUsers.validUser.password,
    );

    await page.waitForURL(urls.dashboard);

    await dashboardPage.verifyDashboardLoaded();
  });

  test("should show error message for invalid credentials", async ({
    page,
    loginPage,
  }) => {
    await page.waitForURL(`${urls.login}*`);

    await loginPage.login(
      testUsers.invalidUser.username,
      testUsers.invalidUser.password,
    );

    await loginPage.verifyErrorMessage("Invalid login data");

    await expect(page).toHaveURL(new RegExp(`${urls.login}`));
  });

  test("should not allow login with empty username", async ({
    page,
    loginPage,
  }) => {
    await page.waitForURL(`${urls.login}*`);

    await loginPage.fillPassword(testUsers.validUser.password);
    await loginPage.clickSubmit();

    await loginPage.verifyErrorMessage("Invalid login data");
    await expect(page).toHaveURL(new RegExp(`${urls.login}`));
  });

  test("should not allow login with empty password", async ({
    page,
    loginPage,
  }) => {
    await page.waitForURL(`${urls.login}*`);

    await loginPage.fillUsername(testUsers.validUser.username);
    await loginPage.clickSubmit();

    await loginPage.verifyErrorMessage("Invalid login data");
    await expect(page).toHaveURL(new RegExp(`${urls.login}`));
  });
});

test.describe("Authenticated User Flow", () => {
  test("should access dashboard directly when already authenticated", async ({
    authenticatedPage,
    dashboardPage,
  }) => {
    await dashboardPage.verifyDashboardLoaded();
  });
});
