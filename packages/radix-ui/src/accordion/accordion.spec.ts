import { test, expect } from "@playwright/test";

import { RadixAccordionPage } from "./accordion.page";
import { accordion } from "./accordion";

test.describe("Radix UI Accordion", () => {
  test("should open and close the accordion", async ({ page }) => {
    const radixAccordionPage = new RadixAccordionPage(page);
    await radixAccordionPage.goto();

    // Test the default open accordion
    await expect(radixAccordionPage.firstAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(
      radixAccordionPage.firstAccordionItemTrigger,
      true
    );
    const firstAccordionItemContent =
      await radixAccordionPage.getAccordionItemContent(
        radixAccordionPage.firstAccordionItemTrigger
      );
    await expect(firstAccordionItemContent).toBeVisible();

    // Test the default closed accordions
    await expect(radixAccordionPage.secondAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(
      radixAccordionPage.secondAccordionItemTrigger,
      false
    );
    const secondAccordionItemContent =
      await radixAccordionPage.getAccordionItemContent(
        radixAccordionPage.secondAccordionItemTrigger
      );
    await expect(secondAccordionItemContent).not.toBeVisible();

    await expect(radixAccordionPage.thirdAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(
      radixAccordionPage.thirdAccordionItemTrigger,
      false
    );
    const thirdAccordionItemContent =
      await radixAccordionPage.getAccordionItemContent(
        radixAccordionPage.thirdAccordionItemTrigger
      );
    await expect(thirdAccordionItemContent).not.toBeVisible();

    // Open the second accordion
    await radixAccordionPage.secondAccordionItemTrigger.click();
    await accordion.exceptTriggerOpen(
      radixAccordionPage.secondAccordionItemTrigger,
      true
    );
    await accordion.exceptTriggerOpen(
      radixAccordionPage.firstAccordionItemTrigger,
      false
    );
    await accordion.exceptTriggerOpen(
      radixAccordionPage.thirdAccordionItemTrigger,
      false
    );
    await expect(secondAccordionItemContent).toBeVisible();

    // Open the third accordion
    await radixAccordionPage.thirdAccordionItemTrigger.click();
    await accordion.exceptTriggerOpen(
      radixAccordionPage.thirdAccordionItemTrigger,
      true
    );
    await accordion.exceptTriggerOpen(
      radixAccordionPage.secondAccordionItemTrigger,
      false
    );
    await accordion.exceptTriggerOpen(
      radixAccordionPage.firstAccordionItemTrigger,
      false
    );
    await expect(thirdAccordionItemContent).toBeVisible();
  });
});
