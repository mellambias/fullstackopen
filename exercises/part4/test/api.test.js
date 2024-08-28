const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/Blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mockBlogs = require("../mock/mockBlogs");
const mockUsers = require("../mock/mockUsers");
const api = supertest(app);
const utils = require("./utils");

describe("Blog API tests", () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		const users = await utils.usersInDatabase();
		await Blog.insertMany(
			mockBlogs.map((blog) => new Blog({ ...blog, user: users[0].id })),
		);
	});

	test("lista todos los blogs en formato JSON", { only: true }, async () => {
		const allBlogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
		const user = allBlogs.body[0].user;

		assert.strictEqual(allBlogs.body.length, mockBlogs.length);
		assert.ok(user.id);
		assert.ok(user.username);
		assert.ok(user.name);
		assert.ok(!user.password);
	});

	test("la propiedad de identificador único de las publicaciones del blog se llama id,", async () => {
		const allBlogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		for (const blog of allBlogs.body) {
			assert.ok(blog.id);
		}
	});

	test(
		"Crear una nueva publicación con token valido",
		{ only: true },
		async () => {
			const blogsAfterpost = await utils.blogsInDatabase();

			// logeamos al primer usuario registrado
			const user = mockUsers[0];
			const response = await api
				.post("/api/login")
				.send({
					username: user.username,
					password: user.password,
				})
				.expect(200)
				.expect("Content-Type", /application\/json/);
			assert.ok(response.body.token);
			const token = response.body.token;

			// Creamos un blog enviando el token recibido
			const newBlog = {
				title: "Test Blog",
				author: "Test Author",
				url: "XXXXXXXXXXXXXXXX",
				likes: 0,
			};

			const result = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const allBlogs = await utils.blogsInDatabase();
			assert.strictEqual(allBlogs.length, blogsAfterpost.length + 1);
			assert.strictEqual(result.body.title, newBlog.title);
			assert.ok(result.body.user);
		},
	);
	test(
		"Crear una nueva publicación con token no valido",
		{ only: true },
		async () => {
			const blogsAfterpost = await utils.blogsInDatabase();
			const token = "tokenInvalido";

			// Creamos un blog enviando el token recibido
			const newBlog = {
				title: "Test Blog",
				author: "Test Author",
				url: "XXXXXXXXXXXXXXXX",
				likes: 0,
			};

			const result = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${token}`)
				.send(newBlog)
				.expect(401)
				.expect("Content-Type", /application\/json/);

			const allBlogs = await utils.blogsInDatabase();
			assert.strictEqual(allBlogs.length, blogsAfterpost.length);
		},
	);
	describe("restricciones del blog", () => {
		let blogsBeforePost;
		beforeEach(async () => {
			blogsBeforePost = await utils.blogsInDatabase();
		});

		test("Si no se proporciona la propiedad likes, se asigna 0 como valor predeterminado", async () => {
			const newBlog = {
				title: "Test Blog",
				author: "Test Author",
				url: "XXXXXXXXXXXXXXXX",
			};

			const result = await api
				.post("/api/blogs")
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			assert.strictEqual(result.body.likes, 0);
		});

		test("Si no se proporciona la propiedad title o url, la respuesta debe ser 400 Bad Request", async () => {
			const blogWithoutTitle = {
				author: "Test Author",
				url: "XXXXXXXXXXXXXXXX",
				likes: 0,
			};

			const blogWithoutUrl = {
				title: "Test Blog",
				author: "Test Author",
				likes: 0,
			};

			const blogsAfert = await utils.blogsInDatabase();

			await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
			await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
			assert.strictEqual(blogsAfert.length, blogsBeforePost.length);
		});
	});
	describe("Borrar publicación", () => {
		test("Borrar una publicación existente", async () => {
			const allBlogs = await utils.blogsInDatabase();
			const blogToDelete = allBlogs.body[0];

			await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

			const allBlogsAfterDelete = await utils.blogsInDatabase();
			assert.strictEqual(allBlogsAfterDelete.length, allBlogs.length - 1);
		});

		test("Borrar una publicación no existente", { only: true }, async () => {
			const nonExistentId = "1111";
			const blogsBefore = await utils.blogsInDatabase();
			const response = await api
				.delete(`/api/blogs/${nonExistentId}`)
				.expect(404);
			const blogsAfter = await utils.blogsInDatabase();
			assert.strictEqual(blogsBefore.length, blogsAfter.length);
			assert(response.body.error.includes("Cast to ObjectId failed"));
		});
	});

	describe("Actualizar publicación", () => {
		test("Actualizar una publicación existente", async () => {
			const allBlogs = await api.get("/api/blogs");
			const blogToUpdate = allBlogs.body[0];
			const updatedLikes = blogToUpdate.likes + 1;

			const result = await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send({ likes: updatedLikes })
				.expect(200)
				.expect("Content-Type", /application\/json/);

			assert.strictEqual(result.body.likes, updatedLikes);
		});

		test(
			"No se actualiza una publicación no existente",
			{ only: true },
			async () => {
				const nonExistentId = "XXXX";
				const updatedLikes = 10;

				const response = await api
					.put(`/api/blogs/${nonExistentId}`)
					.send({ likes: updatedLikes })
					.expect(404);

				assert(response.body.error.includes("Cast to ObjectId failed"));
			},
		);
	});
});

describe("User API tests", () => {
	beforeEach(async () => {
		// establece los valores iniciales de la base de datos antes de cada prueba
		await User.deleteMany({});
		await Blog.deleteMany({});
		const user = await utils.createRootUser();
		await utils.createBlogForUser(user);
	});

	test("Crear un nuevo usuario", async () => {
		const initialUsers = await utils.usersInDatabase();
		const newUser = {
			username: "TestUser",
			name: "Test User",
			password: "test",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAfterPost = await utils.usersInDatabase();
		assert.strictEqual(result.body.username, newUser.username);
		assert.strictEqual(result.body.name, newUser.name);
		assert.strictEqual(usersAfterPost.length, initialUsers.length + 1);
	});
	describe("user restrictions", async () => {
		let usersBeforePost;
		beforeEach(async () => {
			usersBeforePost = await utils.usersInDatabase();
		});
		test("username no puede tener menos de tres letras", async () => {
			const newUser = {
				name: "Test User",
				password: "test",
			};

			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/);

			const usersAfterPost = await utils.usersInDatabase();
			assert.strictEqual(usersAfterPost.length, usersBeforePost.length);
			assert(result.body.error.includes("User validation failed: username:"));
		});
		test("El username debe ser unico", async () => {
			const result = await api
				.post("/api/users")
				.send(mockUsers[0])
				.expect(400)
				.expect("Content-Type", /application\/json/);

			const usersAfterPost = await utils.usersInDatabase();
			assert.strictEqual(usersAfterPost.length, usersBeforePost.length);
			assert(result.body.error.includes("Duplicate key error"));
		});

		test("El password tiene mas de tres letras", async () => {
			const newUser = {
				username: "TestUser",
				name: "Test User",
				password: "te",
			};

			const result = await api
				.post("/api/users")
				.send(newUser)
				.expect(400)
				.expect("Content-Type", /application\/json/);
			const usersAfterPost = await utils.usersInDatabase();
			assert.strictEqual(usersAfterPost.length, usersBeforePost.length);
			assert(
				result.body.error.includes(
					"Password must be at least 3 characters long",
				),
			);
		});
	});
	test(
		"muestra todos los usuarios en formato JSON",
		{ only: true },
		async () => {
			const result = await api
				.get("/api/users")
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const userNames = result.body.map((user) => user.username);
			const blog = result.body[0].blogs[0];

			assert.strictEqual(result.body.length, 1);
			assert(userNames.includes(mockUsers[0].username));

			assert.ok(blog.url);
			assert.ok(blog.title);
			assert.ok(blog.author);
			assert.ok(blog.id);
		},
	);
});
after(async () => {
	await mongoose.connection.close();
});
