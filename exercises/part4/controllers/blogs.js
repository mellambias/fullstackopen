const blogRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

function decodeToken(token) {
	if (!token) {
		throw { name: "JsonWebTokenError", message: "token missing" };
	}

	const decodedToken = jwt.verify(token, config.getSecretToken());

	if (!decodedToken.id) {
		throw { name: "JsonWebTokenError", message: "token invalid" };
	}
	return decodedToken;
}

blogRouter.get("/", async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate("user", {
			username: 1,
			name: 1,
			id: 1,
		});
		response.json(blogs);
	} catch (error) {
		next(error);
	}
});

blogRouter.post("/", async (request, response, next) => {
	try {
		const { title, author, url, likes } = request.body;
		const decodedToken = decodeToken(request.token);
		const user = await User.findById(decodedToken.id);
		const newBlog = new Blog({
			title,
			author,
			url,
			likes,
			user: user.toJSON().id,
		});

		const savedBlog = await newBlog.save();
		user.blogs = user.blogs.concat(savedBlog.toJSON().id);
		await user.save();
		response.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

blogRouter.delete("/:id", async (request, response, next) => {
	try {
		const decodedToken = decodeToken(request.token);
		const user = await User.findById(decodedToken.id);
		const blog = await Blog.findById(request.params.id);
		const blogUser = blog.user.toString();
		const userId = user.id.toString();

		if (blogUser === userId) {
			await blog.deleteOne();
			user.blogs = user.blogs.filter(
				(blogId) => blogId.toString() !== request.params.id,
			);
			await user.save();
			response.status(204).end();
		} else {
			response.status(404).end();
		}
	} catch (error) {
		next(error);
	}
});

blogRouter.put("/:id", async (request, response, next) => {
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			request.body,
			{ new: true, runValidators: true, context: "query" },
		);
		response.status(200).json(updatedBlog);
	} catch (error) {
		next(error);
	}
});

module.exports = blogRouter;
