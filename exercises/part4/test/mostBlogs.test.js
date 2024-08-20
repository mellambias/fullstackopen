const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const mockBlogs = require("../mock/mockBlogs");

describe("mostBlogs: Author that has the largest amount of blogs", () => {
	test("When there are no blogs, return null", () => {
		const result = listHelper.mostBlogs([]);
		assert.strictEqual(result, null);
	});

	test("When there are blogs, return the author with the largest amount of blogs", () => {
		const result = listHelper.mostBlogs(mockBlogs);
		assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
	});
});
