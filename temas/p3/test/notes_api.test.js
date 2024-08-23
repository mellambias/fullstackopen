const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const Note = require("../models/note");
const User = require("../models/user");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("note_api: Api de notas", () => {
	beforeEach(async () => {
		await Note.deleteMany({});
		await User.deleteMany({});
		//creacion de un usuario
		const { username, name, password } = helper.initialUsers[1];
		const passwordHash = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			name,
			passwordHash,
		});
		await user.save();

		for (const note of helper.initialNotes) {
			const noteObject = new Note({ ...note, user: user.id });
			await noteObject.save();
			user.notes = user.notes.concat(noteObject.id);
			await user.save();
		}
	});

	test("notes are returned as json", async () => {
		await api
			.get("/api/notes")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("there are two notes", async () => {
		const response = await api.get("/api/notes");
		assert.strictEqual(response.body.length, helper.initialNotes.length);
	});

	test("the first note is about HTTP methods", async () => {
		const response = await api.get("/api/notes");

		const contents = response.body.map((note) => note.content);
		assert(contents.includes("HTML is easy"));
	});

	test("a login user recives token", async () => {
		const jwtoken = await helper.getToken(api, helper.initialUsers[1]);
		assert(jwtoken.token);
	});

	test("a valid note can be added", async () => {
		const jwtoken = await helper.getToken(api, helper.initialUsers[1]);

		const newNote = {
			content: "note with authorization",
			important: true,
		};

		await api
			.post("/api/notes")
			.send(newNote)
			.set("Authorization", `Bearer ${jwtoken.token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const notesAtEnd = await helper.notesInDb();
		assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

		const contents = notesAtEnd.map((note) => note.content);
		assert(contents.includes("note with authorization"));
	});

	test("note without content is not added", async () => {
		const jwtoken = await helper.getToken(api, helper.initialUsers[1]);
		const newNote = {
			important: true,
		};

		await api
			.post("/api/notes")
			.send(newNote)
			.set("Authorization", `Bearer ${jwtoken.token}`)
			.expect(400);

		const notesAtEnd = await helper.notesInDb();

		assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
	});

	test("a specific note can be viewed", async () => {
		const notesAtStart = await helper.notesInDb();
		const noteToView = notesAtStart[0];
		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.deepStrictEqual(resultNote.body, noteToView);
	});

	test(
		"a note can be deleted if user create the note",
		{ only: true },
		async () => {
			const notesAtStart = await helper.notesInDb();
			const noteToDelete = notesAtStart[0];

			await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

			const notesAtEnd = await helper.notesInDb();

			assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);

			const contents = notesAtEnd.map((note) => note.content);
			assert(!contents.includes(noteToDelete.content));
		},
	);

	after(async () => {
		await mongoose.connection.close();
	});
});
