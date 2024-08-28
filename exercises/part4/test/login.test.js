const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");
const mockUsers = require("../mock/mockUsers");
const api = supertest(app);
const utils = require("./utils");

describe("user login", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await utils.createRootUser();
	});

	test("login with correct credentials", async () => {
		const user = mockUsers[0];
		const response = await api
			.post("/api/login")
			.send({ username: user.username, password: user.password })
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert(response.body.message.includes("Login successful"));
		assert.ok(response.body.token);
	});

	test("login with incorrect credentials", async () => {
		const user = mockUsers[0];
		const response = await api
			.post("/api/login")
			.send({ username: user.username, password: "XXXXXXXXXXXXX" })
			.expect(401)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(response.body.error, "Invalid username or password");
	});

	after(async () => {
		await mongoose.connection.close();
	});
});
