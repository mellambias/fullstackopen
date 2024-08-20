const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mockBlogs = require("../mock/mockBlogs");

describe("mostLikes: The author, whose blog posts have the most like", () => {
	test("When there are no blogs, return null", () => {
		const blogs = [];
		const result = listHelper.mostLikes(blogs);
		assert.strictEqual(result, null);
	});
	test("When there are blogs, return the author with the largest amount of likes", () => {
		const result = listHelper.mostLikes(mockBlogs);
		assert.deepStrictEqual(result, {
			author: "Edsger W. Dijkstra",
			likes: 17,
		});
	});
});
