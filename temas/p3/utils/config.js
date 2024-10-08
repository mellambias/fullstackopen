require("dotenv").config();

const config = {
	dataBases: {
		producction: {
			name: "production",
			uri: process.env.MONGODB_URI,
			username: process.env.MONGODB_USERNAME,
			password: process.env.MONGODB_PASSWORD,
		},
		test: {
			name: "test",
			uri: process.env.MONGODB_URI_TEST,
			username: process.env.MONGODB_USERNAME_TEST,
			password: process.env.MONGODB_PASSWORD_TEST,
		},
	},
	server: {
		PORT: process.env.PORT,
	},
	secret: process.env.SECRET,
	getMongoURI() {
		let env = process.env.NODE_ENV;
		if (this.dataBases[env] === undefined) {
			env = "producction";
		}
		return this.dataBases[env].uri
			.replace("<username>", this.dataBases[env].username)
			.replace("<password>", this.dataBases[env].password)
			.replace("<name>", this.dataBases[env].name);
	},
	getServerPort() {
		return this.server.PORT;
	},
	getJwtSecret() {
		return this.secret;
	},
};

module.exports = config;
