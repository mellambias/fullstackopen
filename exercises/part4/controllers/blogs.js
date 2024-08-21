const blogRouter = require("express").Router();
const Blog = require("../models/Blog");

blogRouter.get("/", async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (error) {
		next(error);
	}
});

blogRouter.post("/", async (request, response, next) => {
	try {
		const newBlog = new Blog(request.body);
		const savedBlog = await newBlog.save();
		response.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

module.exports = blogRouter;
