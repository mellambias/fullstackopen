require("dotenv").config();

const config = {
	dataBases: {
		production: {
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
	token: process.env.SECRET,
	getMongoURI() {
		let entorno = process.env.NODE_ENV;
		if (this.dataBases[entorno] === undefined) {
			entorno = "production";
		}
		return this.dataBases[entorno].uri
			.replace("<username>", this.dataBases[entorno].username)
			.replace("<password>", this.dataBases[entorno].password)
			.replace("<name>", this.dataBases[entorno].name);
	},
	getServerPort() {
		return this.server.PORT;
	},
	getSecretToken() {
		return this.token;
	},
};

module.exports = config;
