import { Locator, Page } from "@playwright/test";
import { accordion } from "./accordion";

export class RadixAccordion {
  readonly page: Page;
  readonly pagePath = "/primitives/docs/components/accordion";
  readonly firstTrigger: Locator;
  readonly secondTrigger: Locator;
  readonly thirdTrigger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstTrigger = page.getByRole("button", {
      name: "Is it accessible?",
    });
    this.secondTrigger = page.getByRole("button", {
      name: "Is it unstyled?",
    });
    this.thirdTrigger = page.getByRole("button", {
      name: "Can it be animated?",
    });
  }

  async goto() {
    await this.page.goto(this.pagePath);
  }

  async getContent(trigger: Locator): Promise<Locator> {
    return await accordion.getAccordionContent(this.page, trigger);
  }
}
