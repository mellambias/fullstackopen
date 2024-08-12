const config = {
	endPoints: {
		persons: "/api/persons",
	},
	getEndPoint: function (endpoint) {
		return `${this.endPoints[endpoint]}`;
	},
};

export default {
	getEndPoint: (endpoint) => config.getEndPoint(endpoint),
};
