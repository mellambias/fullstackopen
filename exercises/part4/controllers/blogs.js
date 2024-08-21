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

blogRouter.delete("/:id", async (request, response, next) => {
	try {
		const blog = await Blog.findByIdAndDelete(request.params.id);
		if (blog) {
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
