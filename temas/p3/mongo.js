const mongoose = require("mongoose");
const config = require("./utils/config");

if (process.argv.length < 2) {
	console.log("Hacen falta argumentos");
	process.exit(1);
}

const url = config.getMongoURI();

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Esquema de la nota
const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

// Modelo de la nota
const Note = mongoose.model("Note", noteSchema);

/* // Nueva nota
const note = new Note({
	content: "MongoDB is easy",
	important: true,
});

note.save().then((result) => {
	console.log("note saved!");
	mongoose.connection.close();
});
 */

Note.find({}).then((result) => {
	for (item of result) {
		console.log(item);
	}
	mongoose.connection.close();
});
