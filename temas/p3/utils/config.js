require("dotenv").config();

const config = {
	dataBases: {
		producction: {
			uri: process.env.MONGODB_URI,
			username: process.env.MONGODB_USERNAME,
			password: process.env.MONGODB_PASSWORD,
		},
		test: {
			uri: process.env.MONGODB_URI_TEST,
			username: process.env.MONGODB_USERNAME_TEST,
			password: process.env.MONGODB_PASSWORD_TEST,
		},
	},
	server: {
		PORT: process.env.PORT,
	},
	getMongoURI() {
		let env = process.env.NODE_ENV;
		if (this.dataBases[env] === undefined) {
			env = "producction";
		}
		return this.dataBases[env].uri
			.replace("<username>", this.dataBases[env].username)
			.replace("<password>", this.dataBases[env].password);
	},
	getServerPort() {
		return this.server.PORT;
	},
};

module.exports = config;
