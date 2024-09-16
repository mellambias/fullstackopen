const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
	beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173");
	});

	test("Login form is show", async ({ page }) => {
		const locator = await page.getByRole("heading", {
			name: "log in to application",
		});
		await expect(locator).toBeVisible();
	});
});
