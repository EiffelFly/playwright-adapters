import { test, expect } from "@playwright/test";

import { Target } from "./accordion.page";
import { accordion } from "./accordion";

test.describe.skip("Radix UI Accordion", () => {
  test("should have correct defaul state", async ({ page }) => {
    const target = new Target(page);
    await target.goto();

    // Test the default open accordion
    await expect(target.firstAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerIsOpen(target.firstAccordionItemTrigger, true);
    const firstAccordionItemContent = await target.getAccordionItemContent(
      target.firstAccordionItemTrigger
    );
    await expect(firstAccordionItemContent).toBeVisible();

    // Test the default closed accordions
    await expect(target.secondAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerIsOpen(
      target.secondAccordionItemTrigger,
      false
    );
    const secondAccordionItemContent = await target.getAccordionItemContent(
      target.secondAccordionItemTrigger
    );
    await expect(secondAccordionItemContent).not.toBeVisible();

    await expect(target.thirdAccordionItemTrigger).toBeVisible();
    await accordion.exceptTriggerIsOpen(
      target.thirdAccordionItemTrigger,
      false
    );
    const thirdAccordionItemContent = await target.getAccordionItemContent(
      target.thirdAccordionItemTrigger
    );
    await expect(thirdAccordionItemContent).not.toBeVisible();
  });

  test("should open and close the accordion", async ({ page }) => {
    const target = new Target(page);
    await target.goto();

    // Open the second accordion
    await target.secondAccordionItemTrigger.click();
    await accordion.exceptTriggerIsOpen(
      target.secondAccordionItemTrigger,
      true
    );
    await accordion.exceptTriggerIsOpen(
      target.firstAccordionItemTrigger,
      false
    );
    await accordion.exceptTriggerIsOpen(
      target.thirdAccordionItemTrigger,
      false
    );
    const secondAccordionItemContent = await target.getAccordionItemContent(
      target.secondAccordionItemTrigger
    );
    await expect(secondAccordionItemContent).toBeVisible();

    // Open the third accordion
    await target.thirdAccordionItemTrigger.click();
    await accordion.exceptTriggerIsOpen(target.thirdAccordionItemTrigger, true);
    await accordion.exceptTriggerIsOpen(
      target.secondAccordionItemTrigger,
      false
    );
    await accordion.exceptTriggerIsOpen(
      target.firstAccordionItemTrigger,
      false
    );
    const thirdAccordionItemContent = await target.getAccordionItemContent(
      target.thirdAccordionItemTrigger
    );
    await expect(thirdAccordionItemContent).toBeVisible();
  });
});
