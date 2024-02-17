import { Locator, Page, expect } from "@playwright/test";

async function getAccordionItemContent(
  page: Page,
  accordionItem: Locator
): Promise<Locator> {
  const ariaControl = await accordionItem.getAttribute("aria-controls");
  // Radix is using id with colon, we need to escape it
  const escapedAriaControl = ariaControl?.replaceAll(":", "\\:");
  return page.locator(`#${escapedAriaControl}`);
}

async function exceptTriggerIsOpen(triggerLocator: Locator, open: boolean) {
  await expect(triggerLocator).toHaveAttribute(
    "data-state",
    open ? "open" : "closed"
  );
}

export const accordion = {
  getAccordionItemContent,
  exceptTriggerIsOpen,
};
