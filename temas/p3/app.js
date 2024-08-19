const express = require("express");
const cors = require("cors");
const app = express();
const serverConfig = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");

const url = serverConfig.getMongoURI();

mongoose.set("strictQuery", false);
logger.info("connecting to", url);
mongoose
	.connect(url)
	.then((result) => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.info("error connecting to MongoDB:", error.message);
	});

// rutas
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

// controlador de solicitudes no encontradas
app.use(middleware.unknownEndpoint);

// error handler debe ser el último middleware cargado
app.use(middleware.errorHandler);

module.exports = app;
