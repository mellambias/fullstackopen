const mongoose = require("mongoose");
const { apliBlackList } = require("../utils/models");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	name: String,
	passwordHash: String,
	blogs: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Blog",
			},
		],
		default: [],
	},
});

userSchema.set("toJSON", {
	transform: (document, ret, options) => {
		const blackList = ["_id", "__v", "passwordHash"];
		ret.id = ret._id.toString();
		return apliBlackList(ret, blackList);
	},
});

module.exports = mongoose.model("User", userSchema);
