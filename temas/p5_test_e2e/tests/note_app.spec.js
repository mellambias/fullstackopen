const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				name: "Superuser",
				username: "root",
				password: "salainen",
			},
		});
		await page.goto("/");
	});
	test("front page can be opened", async ({ page }) => {
		const locator = await page.getByText("Notes");
		await expect(locator).toBeVisible();
		await expect(page.getByText("Ejemplo de estilo en linea")).toBeVisible();
	});

	test("el usuario puede iniciar sesión", async ({ page }) => {
		await loginWith(page, "root", "salainen");
		await expect(page.getByText("Superuser logged in")).toBeVisible();
	});

	test("el inicio de sesión falla si el password es incorrecto", async ({
		page,
	}) => {
		await page.getByRole("button", { name: "log in" }).click();
		await page.getByTestId("username").fill("root");
		await page.getByTestId("password").fill("wrong");
		await page.getByRole("button", { name: "login" }).click();

		// await expect(page.getByText("Wrong credentials")).toBeVisible();

		const errorDiv = await page.locator(".error"); // el elemento con la clase error
		await expect(errorDiv).toContainText("Wrong credentials");
		// comprobar los estilos css del elemento con toHaveCSS
		await expect(errorDiv).toHaveCSS("border-style", "solid");
		// los colores en este framework se definen con rgb y un espacio despues de la coma
		await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
		// No deberia mostrar el nombre del usuario
		await expect(page.getByText("Superuser logged in")).not.toBeVisible();
	});

	describe("cuando ha iniciado sesión", () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, "root", "salainen");
		});

		test("puede crear una nueva nota", async ({ page }) => {
			await createNote(page, "a note created by playwrigth");
			await expect(
				page.getByText("a note created by playwrigth"),
			).toBeVisible();
		});

		describe("y varias notas existen", () => {
			beforeEach(async ({ page }) => {
				await createNote(page, "primera nota");
				await createNote(page, "segunda nota");
				await createNote(page, "tercera nota");
			});

			test("una de ellas puede cambiar a no importante", async ({ page }) => {
				await page.pause();
				const otherNoteText = await page.getByText("segunda nota");
				const otherNoteElement = await otherNoteText.locator("..");

				await otherNoteElement
					.getByRole("button", { name: "make not important" })
					.click();
				await expect(
					otherNoteElement.getByText("make important"),
				).toBeVisible();
			});
		});
	});
});
