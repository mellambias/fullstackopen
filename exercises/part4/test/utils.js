const bcrypt = require("bcrypt");
const Blog = require("../models/Blog");
const User = require("../models/user");
const mockUsers = require("../mock/mockUsers");

async function blogsInDatabase() {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
}
async function usersInDatabase() {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
}

async function createRootUser() {
	const root = mockUsers[0];
	const passwordHash = await bcrypt.hash(root.password, 10);
	const user = new User({
		username: root.username,
		name: root.name,
		passwordHash,
	});

	await user.save();
	return user;
}

async function createBlogForUser(user) {
	try {
		const rootUser = await User.findOne({ username: user.username });
		const blog = new Blog({
			title: "test blog",
			author: "test author",
			url: "test url",
			likes: 0,
			user: rootUser._id,
		});

		await blog.save();
		rootUser.blogs = rootUser.blogs.concat(blog._id);
		await rootUser.save();
		return blog;
	} catch (error) {
		console.log(error);
		return error;
	}
}

module.exports = {
	blogsInDatabase,
	usersInDatabase,
	createRootUser,
	createBlogForUser,
};
