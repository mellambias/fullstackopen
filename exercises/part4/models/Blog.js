const mongoose = require("mongoose");

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
});

blogSchema.set("toJSON", {
	transform: (document, ret) => {
		const newDocument = {
			id: ret._id.toString(),
		};
		for (const key in ret) {
			if (key !== "_id" && key !== "__v") {
				newDocument[key] = ret[key];
			}
		}
		return newDocument;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
