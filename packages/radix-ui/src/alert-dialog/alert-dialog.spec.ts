import { test, expect } from "@playwright/test";
import { Target } from "./alert-dialog.page";
import { alertDialog } from "./alert-dialog";

test.describe("Radix UI Accordion", () => {
  test("should have correct defaul state", async ({ page }) => {
    const target = await Target.goto(page);
    await expect(target.alertDialogTrigger).toBeVisible();
    await alertDialog.exceptTriggerIsOpen(target.alertDialogTrigger, false);
  });

  test("should open and close the alert dialog", async ({ page }) => {
    const target = await Target.goto(page);

    // Open the alert dialog
    await target.alertDialogTrigger.click();
    await expect(target.alertDialogContent).toBeVisible();

    // Click outside the alert dialog should not close the alert dialog
    await alertDialog.clickOutsideAlertDialog(page);
    await expect(target.alertDialogContent).toBeVisible();

    // Close the alert dialog
    const cancaleButton = target.alertDialogContent.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
    await cancaleButton.click();
    await expect(target.alertDialogContent).not.toBeVisible();
  });
});
