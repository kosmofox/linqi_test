import { urls } from "../../src/configs/urls";
import { test, expect } from "../../src/fixtures/authFixture";
import { timeouts } from "../../src/configs/timeouts";
import { ProcessCreatePage } from "../../src/pages";

test.describe("Process Management Flow", () => {
  test.beforeEach(async ({ authenticatedPage, dashboardPage, processPage }) => {
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.navigateToProcess();
    await processPage.verifyProcessPageLoaded();
    await processPage.verifyCreateButtonVisible();
  });

  test("should create a new process with drag and drop element", async ({
    randomProcessName,
    processPage,
    context,
  }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      processPage.clickCreateButton(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await newPage.waitForURL(`${urls.processCreate}*`, {
      timeout: timeouts.short,
    });

    const createProcessPage = new ProcessCreatePage(newPage);

    await createProcessPage.fillProcessName(randomProcessName);

    expect(createProcessPage.createdNode).not.toBeVisible();

    await createProcessPage.openSidebar();

    await createProcessPage.dragAndDropElement();

    await expect(createProcessPage.getDroppedElement()).toBeVisible();

    const isDropped = await createProcessPage.isElementDropped();
    expect(isDropped).toBe(true);

    await createProcessPage.closeSidebar();

    await createProcessPage.clickSaveButton();

    expect(createProcessPage.createdNode).toBeVisible();

    await expect(createProcessPage.processNameInput).toHaveValue(
      randomProcessName,
    );

    await newPage.close();
  });

  test("should handle drag and drop of specific element", async ({
    randomProcessName,
    processPage,
    context,
  }) => {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      processPage.clickCreateButton(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await newPage.waitForURL(`${urls.processCreate}*`, {
      timeout: timeouts.short,
    });

    const createProcessPage = new ProcessCreatePage(newPage);

    await createProcessPage.fillProcessName(randomProcessName);

    expect(createProcessPage.createdNode).not.toBeVisible();

    await createProcessPage.openSidebar();

    await createProcessPage.dragAndDropElement("11");

    await expect(createProcessPage.getDroppedElement()).toBeVisible();

    const isDropped = await createProcessPage.isElementDropped();
    expect(isDropped).toBe(true);

    await createProcessPage.closeSidebar();

    await createProcessPage.clickSaveButton();

    expect(createProcessPage.createdNode).toBeVisible();

    await expect(createProcessPage.processNameInput).toHaveValue(
      randomProcessName,
    );

    await newPage.close();
  });
});
