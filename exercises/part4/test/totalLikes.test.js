const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mockBlogs = require("../mock/mockBlogs");

describe("total likes: Total sum of likes in all blog posts", () => {
	const listWithOneBlog = [
		{
			_id: "",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "",
			likes: 5,
			__v: 0,
		},
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		assert.strictEqual(result, 5);
	});

	test("when list has many blogs", () => {
		const result = listHelper.totalLikes(mockBlogs);
		assert.strictEqual(result, 36);
	});

	test("when list is empty", () => {
		const result = listHelper.totalLikes([]);
		assert.strictEqual(result, 0);
	});
});
