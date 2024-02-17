import { Locator, Page } from "@playwright/test";
import { accordion } from "./accordion";

export class RadixAccordionPage {
  readonly page: Page;
  readonly pagePath = "/primitives/docs/components/accordion";
  readonly firstAccordionItemTrigger: Locator;
  readonly secondAccordionItemTrigger: Locator;
  readonly thirdAccordionItemTrigger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstAccordionItemTrigger = page.getByRole("button", {
      name: "Is it accessible?",
    });
    this.secondAccordionItemTrigger = page.getByRole("button", {
      name: "Is it unstyled?",
    });
    this.thirdAccordionItemTrigger = page.getByRole("button", {
      name: "Can it be animated?",
    });
  }

  async goto() {
    await this.page.goto(this.pagePath);
  }

  async getAccordionItemContent(itemTrigger: Locator): Promise<Locator> {
    return await accordion.getAccordionContent(this.page, itemTrigger);
  }
}
