import { test, expect } from "@playwright/test";

import { RadixAccordion } from "./accordion.page";
import { accordion } from "./accordion";

test.describe("Radix UI Accordion", () => {
  test("should open and close the accordion", async ({ page }) => {
    const radixAccordion = new RadixAccordion(page);
    await radixAccordion.goto();

    // Test the default open accordion
    await expect(radixAccordion.firstTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(radixAccordion.firstTrigger, true);
    const firstItemContent = await radixAccordion.getContent(
      radixAccordion.firstTrigger
    );
    await expect(firstItemContent).toBeVisible();

    // Test the default closed accordions
    await expect(radixAccordion.secondTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(radixAccordion.secondTrigger, false);
    const secondItemContent = await radixAccordion.getContent(
      radixAccordion.secondTrigger
    );
    await expect(secondItemContent).not.toBeVisible();

    await expect(radixAccordion.thirdTrigger).toBeVisible();
    await accordion.exceptTriggerOpen(radixAccordion.thirdTrigger, false);
    const thirdItemContent = await radixAccordion.getContent(
      radixAccordion.thirdTrigger
    );
    await expect(thirdItemContent).not.toBeVisible();

    // Open the second accordion
    await radixAccordion.secondTrigger.click();
    await accordion.exceptTriggerOpen(radixAccordion.secondTrigger, true);
    await accordion.exceptTriggerOpen(radixAccordion.firstTrigger, false);
    await accordion.exceptTriggerOpen(radixAccordion.thirdTrigger, false);
    await expect(secondItemContent).toBeVisible();

    // Open the third accordion
    await radixAccordion.thirdTrigger.click();
    await accordion.exceptTriggerOpen(radixAccordion.thirdTrigger, true);
    await accordion.exceptTriggerOpen(radixAccordion.secondTrigger, false);
    await accordion.exceptTriggerOpen(radixAccordion.firstTrigger, false);
    await expect(thirdItemContent).toBeVisible();
  });
});
