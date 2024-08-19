const logger = require("../utils/logger");
const mongoose = require("mongoose");
// Esquema de la nota
const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: {
		type: Boolean,
	},
	date: Date,
});

// configuramos el formato de respuesta JSON para que incluya el id de la nota y no el _id de mongoDB
noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		returnedObject._id = undefined;
		returnedObject.__v = undefined;
	},
});

// exportamos el modelo
module.exports = mongoose.model("Note", noteSchema);
