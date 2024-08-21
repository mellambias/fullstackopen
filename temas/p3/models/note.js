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
// https://mongoosejs.com/docs/api/document.html#transform
noteSchema.set("toJSON", {
	transform: (document, ret, options) => {
		const newDocument = {
			id: document._id.toString(),
		};
		for (const key in ret) {
			if (key !== "_id" && key !== "__v") {
				newDocument[key] = ret[key];
			}
		}
		return newDocument;
	},
});

// exportamos el modelo
module.exports = mongoose.model("Note", noteSchema);
