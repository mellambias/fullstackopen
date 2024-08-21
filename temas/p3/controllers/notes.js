const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({});
	res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
	try {
		const note = await Note.findById(req.params.id);
		if (note) {
			res.json(note);
		} else {
			res.status(404).end();
		}
	} catch (err) {
		next(err);
	}
});

notesRouter.delete("/:id", async (req, res, next) => {
	try {
		await Note.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
});

notesRouter.put("/:id", async (req, res, next) => {
	const { important } = req.body;
	try {
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id,
			{ important },
			{ new: true, runValidators: true },
		);
		res.json(updatedNote);
	} catch (error) {
		next(error);
	}
});

notesRouter.post("/", async (req, res, next) => {
	const note = req.body;

	const newNote = new Note({
		content: note.content,
		important:
			typeof note.important !== "undefined" ? Boolean(note.important) : false,
		date: new Date().toISOString(),
	});

	try {
		const savedNote = await newNote.save();
		res.status(201).json(savedNote);
	} catch (error) {
		next(error);
	}
});

module.exports = notesRouter;
