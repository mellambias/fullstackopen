const express = require("express");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.getServerPort();
app.listen(PORT, () => {
	logger.info(`Server Blogs is running on port ${PORT}`);
});
