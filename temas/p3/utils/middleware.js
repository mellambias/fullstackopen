const logger = require("./logger");
// Middlewares

const requestLogger = (req, res, next) => {
	logger.info("Method:", req.method);
	logger.info("Path:  ", req.path);
	logger.info("Body:  ", req.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
	logger.error("name", err.name, "message", err.message);
	console.error(err);
	switch (err.name) {
		case "CastError":
			return res.status(400).send({ error: err.message });
		case "ValidationError":
			return res.status(400).json({ error: err.message });
		case "MongoServerError":
			if (err.message.includes("E11000 duplicate key error")) {
				return res
					.status(400)
					.json({ error: "expected `username` to be unique" });
			}
			break;
		case "JsonWebTokenError":
			return res.status(401).json({ error: "invalid token" });
		case "TokenExpiredError":
			return res.status(401).json({ error: "Token expired" });
		default:
			break;
	}
	next(err);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
};
