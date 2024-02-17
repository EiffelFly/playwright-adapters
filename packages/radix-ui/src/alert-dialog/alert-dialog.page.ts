import { Locator, Page } from "@playwright/test";
import { alertDialog } from "./alert-dialog";

export class Target {
  readonly page: Page;
  readonly alertDialogTrigger: Locator;
  readonly alertDialogContent: Locator;

  private constructor(
    page: Page,
    alertDialogTrigger: Locator,
    alertDialogContent: Locator
  ) {
    this.page = page;
    this.alertDialogTrigger = alertDialogTrigger;
    this.alertDialogContent = alertDialogContent;
  }

  static async goto(page: Page) {
    await page.goto("/primitives/docs/components/alert-dialog");
    const alertDialogTrigger = page.getByRole("button", {
      name: "Delete account",
    });
    const alertDialogContent = await alertDialog.getAlertDialogContent(
      page,
      alertDialogTrigger
    );
    return new Target(page, alertDialogTrigger, alertDialogContent);
  }
}
