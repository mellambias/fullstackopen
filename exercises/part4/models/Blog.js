const mongoose = require("mongoose");
const { apliBlackList } = require("../utils/models");
const user = require("./user");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
	},
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

blogSchema.set("toJSON", {
	transform: (document, ret, options) => {
		const blackList = ["_id", "__v"];
		ret.id = ret._id.toString();
		return apliBlackList(ret, blackList);
	},
});

module.exports = mongoose.model("Blog", blogSchema);
