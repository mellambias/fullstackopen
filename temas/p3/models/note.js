const { type } = require("express/lib/response");
const logger = require("../utils/logger");
const { apliBlackList } = require("../utils/models");
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
	// Expandamos el esquema para que contenga información sobre el usuario que la creó
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

// configuramos el formato de respuesta JSON para que incluya el id de la nota y no el _id de mongoDB
// https://mongoosejs.com/docs/api/document.html#transform
noteSchema.set("toJSON", {
	transform: (document, ret, options) => {
		const blackList = ["_id", "__v"];
		ret.id = ret._id.toString();
		return apliBlackList(ret, blackList);
	},
});

// exportamos el modelo
module.exports = mongoose.model("Note", noteSchema);
