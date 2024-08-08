import notes from "./services/notes";

const config = {
	jsonServer: {
		host: "http://localhost",
		port: 3003,
	},
	endPoints: {
		notes: "/notes",
	},
	getEndPoint: function (endpoint) {
		return `${this.jsonServer.host}:${this.jsonServer.port}${this.endPoints[endpoint]}`;
	},
};

export default {
	getEndPoint: (endpoint) => config.getEndPoint(endpoint),
};
