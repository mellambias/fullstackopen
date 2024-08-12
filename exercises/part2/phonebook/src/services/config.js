const config = {
	jsonServer: {
		host: "http://localhost",
		port: 3001,
	},
	endPoints: {
		persons: "/api/persons",
	},
	getEndPoint: function (endpoint) {
		return `${this.jsonServer.host}:${this.jsonServer.port}${this.endPoints[endpoint]}`;
	},
};

export default {
	getEndPoint: (endpoint) => config.getEndPoint(endpoint),
};
