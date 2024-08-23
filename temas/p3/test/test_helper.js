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

const initialUsers = [
	{
		username: "root",
		name: "Root",
		passwordHash: "123456",
	},
	{
		username: "mluukkai",
		name: "Matti Luukkainem",
		password: "salainen",
	},
];

async function nonExistingId() {
	const note = new Note({ content: "Will be removed" });
	await note.save();
	await note.deleteOne();

	return note._id.toString();
}

async function notesInDb() {
	const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
	const notesToJson = notes.map((note) => {
		return note.toJSON();
	});
	return notesToJson;
}
async function usersInDb() {
	const users = await User.find({}).populate("notes", {
		content: 1,
		important: 1,
	});
	return users.map((user) => user.toJSON());
}

async function getToken(api, user) {
	const { username, password } = user;
	const jwtoken = await api
		.post("/api/login")
		.send({
			username,
			password,
		})
		.expect(200)
		.expect("Content-Type", /application\/json/);

	return jwtoken.body;
}

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
	initialUsers,
	usersInDb,
	getToken,
};
