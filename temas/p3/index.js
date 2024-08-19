const app = require("./app");
const serverConfig = require("./utils/config");
const logger = require("./utils/logger");

const PORT = serverConfig.getServerPort();
app.listen(PORT, () => {
	logger.info(`Notes Server running on port ${PORT}`);
});
