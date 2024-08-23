const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

function getTokenFrom(request) {
	const authorization = request.get("authorization");
	if (authorization?.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
}

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
	res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
	const note = await Note.findById(req.params.id).populate("user", {
		username: 1,
		name: 1,
	});
	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
});

notesRouter.delete("/:id", async (req, res, next) => {
	await Note.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

notesRouter.put("/:id", async (req, res, next) => {
	const { important } = req.body;
	const updatedNote = await Note.findByIdAndUpdate(
		req.params.id,
		{ important },
		{ new: true, runValidators: true },
	);
	res.json(updatedNote);
});

notesRouter.post("/", async (req, res, next) => {
	const note = req.body;
	const decodedToken = jwt.verify(getTokenFrom(req), config.getJwtSecret());

	if (!decodedToken) {
		return res.status(401).json({ error: "token invalid" });
	}

	// localiza al usuario que creará la nota
	const user = await User.findById(decodedToken.id);

	const newNote = new Note({
		content: note.content,
		important:
			typeof note.important !== "undefined" ? Boolean(note.important) : false,
		date: new Date().toISOString(),
		user: user.id,
	});

	const savedNote = await newNote.save();

	// añade al usuario el identidicador de la nota guardada y lo guarda
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

	res.status(201).json(savedNote);
});

module.exports = notesRouter;
