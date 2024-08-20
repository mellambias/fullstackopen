const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mockBlogs = require("../mock/mockBlogs");

describe("favoriteBlog: Blog has more likes", () => {
	test("returns the blog with the most likes", () => {
		const mostLikes = {
			title: mockBlogs[2].title,
			author: mockBlogs[2].author,
			likes: mockBlogs[2].likes,
		};
		const result = listHelper.favoriteBlog(mockBlogs);
		assert.deepStrictEqual(result, mostLikes);
	});

	test("returns null if the list is empty", () => {
		const result = listHelper.favoriteBlog([]);
		assert.strictEqual(result, null);
	});
});
