const Note = require("../models/note");

const initialNotes = [
	{
		content: "HTML is easy",
		important: false,
	},
	{
		content: "Browser can execute only Javascript",
		important: true,
	},
];

async function nonExistingId() {
	const note = new Note({ content: "Will be removed" });
	await note.save();
	await note.deleteOne();

	return note._id.toString();
}

async function notesInDb() {
	const notes = await Note.find({});
	const notesToJson = notes.map((note) => {
		return note.toJSON();
	});
	return notesToJson;
}

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
};
