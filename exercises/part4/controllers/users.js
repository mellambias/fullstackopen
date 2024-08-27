const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res, next) => {
	try {
		const { username, name, password } = req.body;
		if (!password) {
			next({
				name: "ValidationError",
				message: "Password are required",
			});
		}
		if (password.length < 3) {
			next({
				name: "ValidationError",
				message: "Password must be at least 3 characters long",
			});
		}
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const user = new User({
			username,
			name,
			passwordHash,
		});

		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (error) {
		next(error);
	}
});

userRouter.get("/", async (req, res, next) => {
	try {
		const users = await User.find({}).populate("blogs", {
			url: 1,
			title: 1,
			author: 1,
			id: 1,
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
});

module.exports = userRouter;
