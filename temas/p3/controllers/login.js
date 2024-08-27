const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: "invalid username o password",
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	// Podemos hacer que el token expire
	const token = jwt.sign(userForToken, config.getJwtSecret(), {
		expiresIn: 60 * 60,
	});

	res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
