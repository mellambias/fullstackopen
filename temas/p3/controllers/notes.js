const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({});
	res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
	const note = await Note.findById(req.params.id);
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

	const newNote = new Note({
		content: note.content,
		important:
			typeof note.important !== "undefined" ? Boolean(note.important) : false,
		date: new Date().toISOString(),
	});
	const savedNote = await newNote.save();
	res.status(201).json(savedNote);
});

module.exports = notesRouter;
