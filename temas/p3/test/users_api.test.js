const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

describe("cuando inicialmente solo existe un usuario en la bd", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("123456", 10);
		const user = new User({
			username: "root",
			name: "Root",
			passwordHash,
		});
		await user.save();
	});

	test("crea un nuevo usuario", async () => {
		usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainem",
			password: "salainen",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

		const userNames = usersAtEnd.map((user) => user.username);
		assert(userNames.includes(newUser.username));
	});

	test(
		"creation fails with proper statuscode and message if username already taken",
		{ todo: true },
		async () => {
			const usersAtStart = await helper.usersInDb();

			const newUser = {
				username: "root",
				name: "Superuser",
				password: "salainen",
			};

			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			const usersAtEnd = await helper.usersInDb();
			assert(result.body.error.includes("expected `username` to be unique"));

			assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		},
	);

	after(async () => {
		await mongoose.connection.close();
		console.log("cerrando la conexion a la base de datos");
	});
});
