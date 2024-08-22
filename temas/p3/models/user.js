/*
En este caso, tomamos la decisión de almacenar los ID de las notas creadas por el usuario en el documento de usuario.
*/

const mongoose = require("mongoose");
const { apliBlackList } = require("../utils/models");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, // esto asegura que sea unico
	},
	name: String,
	passwordHash: String,
	notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }], // Almacena los ID de las notas creadas por el usuario
});

userSchema.set("toJSON", {
	transform: (document, ret, options) => {
		const blackList = ["_id", "__v", "passwordHash"];
		ret.id = ret._id.toString();
		return apliBlackList(ret, blackList);
	},
});

module.exports = mongoose.model("User", userSchema);
