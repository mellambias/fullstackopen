const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/Blog");
const mockBlogs = require("../mock/mockBlogs");
const api = supertest(app);

describe("Blog API tests", () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		await Blog.insertMany(mockBlogs.map((blog) => new Blog(blog)));
	});

	test("lista todos los blogs en formato JSON", async () => {
		const allBlogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.strictEqual(allBlogs.body.length, mockBlogs.length);
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

	test("Crear una nueva publicación", async () => {
		const newBlog = {
			title: "Test Blog",
			author: "Test Author",
			url: "XXXXXXXXXXXXXXXX",
			likes: 0,
		};

		const result = await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const allBlogs = await api.get("/api/blogs");
		assert.strictEqual(allBlogs.body.length, mockBlogs.length + 1);
		assert.strictEqual(result.body.title, newBlog.title);
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

		await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
		await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
	});

	after(async () => {
		await mongoose.connection.close();
	});
});
