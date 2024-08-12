const config = {
	jsonServer: {
		host: "http://localhost",
		port: 3002,
	},
	endPoints: {
		notes: "/api/notes",
	},
	getEndPoint: function (endpoint) {
		//return `${this.jsonServer.host}:${this.jsonServer.port}${this.endPoints[endpoint]}`;
		return `${this.endPoints[endpoint]}`;
	},
};

export default {
	getEndPoint: (endpoint) => config.getEndPoint(endpoint),
};
