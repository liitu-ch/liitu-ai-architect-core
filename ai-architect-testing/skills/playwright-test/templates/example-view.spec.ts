import { test, expect } from "@playwright/test";

test.describe("Example View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/example");
  });

  test.describe("Table Display", () => {
    test("shows data on page load", async ({ page }) => {
      const rows = page.getByRole("row");
      // First row is header, so expect more than 1
      await expect(rows).toHaveCount(/.+/);
      expect(await rows.count()).toBeGreaterThan(1);
    });

    test("has expected column headers", async ({ page }) => {
      const headers = page.getByRole("columnheader");
      await expect(headers.nth(0)).toHaveText("Name");
      await expect(headers.nth(1)).toHaveText("Email");
      await expect(headers.nth(2)).toHaveText("Status");
    });
  });

  test.describe("Row Selection and Form", () => {
    test("clicking a row populates the form", async ({ page }) => {
      const firstRow = page.getByRole("row").nth(1);
      const expectedName = await firstRow.getByRole("cell").first().innerText();

      await firstRow.click();

      const nameInput = page.getByLabel("Name");
      await expect(nameInput).toHaveValue(expectedName);
    });

    test("saving updates the table cell", async ({ page }) => {
      await page.getByRole("row").nth(1).click();

      const nameInput = page.getByLabel("Name");
      await nameInput.fill("Updated Name");

      await page.getByRole("button", { name: "Save" }).click();

      const firstCell = page.getByRole("row").nth(1).getByRole("cell").first();
      await expect(firstCell).toHaveText("Updated Name");
    });
  });

  test.describe("Form Validation", () => {
    test("required field shows error when empty", async ({ page }) => {
      await page.getByRole("row").nth(1).click();

      const nameInput = page.getByLabel("Name");
      await nameInput.clear();

      await page.getByRole("button", { name: "Save" }).click();

      await expect(nameInput).toHaveAttribute("aria-invalid", "true");
      await expect(page.getByText("Field is required")).toBeVisible();
    });
  });

  test.describe("Dialog Interactions", () => {
    test("delete button opens confirmation dialog", async ({ page }) => {
      await page.getByRole("row").nth(1).click();

      await page.getByRole("button", { name: "Delete" }).click();

      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", { name: "Confirm Delete" }),
      ).toBeVisible();

      await dialog.getByRole("button", { name: "Cancel" }).click();

      await expect(dialog).toBeHidden();
    });
  });
});
