import { Page, Locator } from "@playwright/test";

export class ProcessCreatePage {
  readonly page: Page;
  readonly processNameInput: Locator;
  readonly openSidebarButton: Locator;
  readonly sidebar: Locator;
  readonly sidebarCloseButton: Locator;
  readonly dropField: Locator;
  readonly droppedElement: Locator;
  readonly saveButton: Locator;
  readonly createdNode: Locator;

  constructor(page: Page) {
    this.page = page;

    this.processNameInput = page.locator(
      'input[data-automation-id="txt-processName"]',
    );
    this.openSidebarButton = page.locator(
      'button[data-automation-id="pdActions-click"]',
    );
    this.sidebar = page.locator("#SidebarActions-Content");
    this.sidebarCloseButton = page.locator(
      'button[type="button"][title="Close"]',
    );
    this.dropField = page.locator("div.linqi-graph-paper");
    this.droppedElement = page.locator(
      'div[data-automation-id="pd-actions-13"]',
    );
    this.saveButton = page.locator('button[data-automation-id="pdSave-click"]');
    this.createdNode = page.locator(
      "div.linqi-graph-nodeContainer.linqi-graph-nodeContainerEditable",
    );
  }

  async fillProcessName(name: string): Promise<void> {
    await this.processNameInput.fill(name);
  }

  async getProcessName(): Promise<string> {
    return await this.processNameInput.inputValue();
  }

  async openSidebar(): Promise<void> {
    await this.openSidebarButton.click();
    await this.sidebar.waitFor({ state: "visible" });
  }

  async closeSidebar(): Promise<void> {
    await this.sidebarCloseButton.click();
    await this.sidebar.waitFor({ state: "hidden" });
  }

  getSidebarElement(elementName?: string): Locator {
    if (elementName) {
      return this.sidebar.locator(
        `div[data-automation-id="pd-actions-${elementName}"]`,
      );
    }

    return this.sidebar.locator('[draggable="true"]').first();
  }

  async dragAndDropElement(elementSelector?: string): Promise<void> {
    const sourceElement = elementSelector
      ? this.getSidebarElement(elementSelector)
      : this.getSidebarElement();

    await sourceElement.dragTo(this.dropField);
  }

  async isElementDropped(): Promise<boolean> {
    return await this.droppedElement.isVisible();
  }

  getDroppedElement(): Locator {
    return this.droppedElement;
  }

  async clickSaveButton(): Promise<void> {
    await this.saveButton.click();
  }
}
