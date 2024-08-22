const Note = require("../models/note");
const User = require("../models/user");

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
async function usersInDb() {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
}

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
	usersInDb,
};
