const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

loginRouter.post("/", async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return next({
				name: "credentialError",
				message: "Invalid username or password",
			});
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordCorrect) {
			return next({
				name: "credentialError",
				message: "Invalid username or password",
			});
		}
		const token = jwt.sign(
			{ id: user._id, username: user.username },
			config.getSecretToken(),
		);
		res.status(200).json({ name: user.name, token });
	} catch (error) {
		next(error);
	}
});

module.exports = loginRouter;
