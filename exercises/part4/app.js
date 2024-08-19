const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const mongoUrl = config.getMongoURI();
logger.info("connecting to", mongoUrl);
mongoose
	.connect(mongoUrl)
	.then((connection) => {
		const { host, port, name } = connection.connections[0];
		logger.info(`Connected to "${host}" at "${port}" with name "${name}"`);
	})
	.catch((error) => {
		logger.error(error.message);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
