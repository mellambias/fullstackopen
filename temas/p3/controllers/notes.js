const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes);
	});
});

notesRouter.get("/:id", (req, res, next) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

notesRouter.delete("/:id", (req, res, next) => {
	Note.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((err) => next(err));
});

notesRouter.put("/:id", (req, res, next) => {
	const { important } = req.body;

	Note.findByIdAndUpdate(
		req.params.id,
		{ important },
		{ new: true, runValidators: true },
	)
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((err) => next(err));
});

notesRouter.post("/", (req, res, next) => {
	const note = req.body;

	const newNote = new Note({
		content: note.content,
		important:
			typeof note.important !== "undefined" ? Boolean(note.important) : false,
		date: new Date().toISOString(),
	});

	newNote
		.save()
		.then((savedNote) => {
			res.status(201).json(savedNote);
		})
		.catch((error) => next(error));
});

module.exports = notesRouter;
