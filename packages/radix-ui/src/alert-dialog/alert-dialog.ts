import { Locator, Page, expect } from "@playwright/test";

async function getAlertDialogContent(
  page: Page,
  trigger: Locator
): Promise<Locator> {
  const ariaControl = await trigger.getAttribute("aria-controls");
  // Radix is using id with colon, we need to escape it
  const escapedAriaControl = ariaControl?.replaceAll(":", "\\:");
  return page.locator(`#${escapedAriaControl}`);
}

async function exceptTriggerIsOpen(triggerLocator: Locator, open: boolean) {
  console.log(await triggerLocator.getAttribute("data-state"));
  await expect(triggerLocator).toHaveAttribute(
    "data-state",
    open ? "open" : "closed"
  );
}

async function clickOutsideAlertDialog(page: Page) {
  await page.mouse.click(10, 10);
}

export const alertDialog = {
  getAlertDialogContent,
  exceptTriggerIsOpen,
  clickOutsideAlertDialog,
};
