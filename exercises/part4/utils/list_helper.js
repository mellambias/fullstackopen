function dummy(blogList) {
	return 1;
}

function totalLikes(blogList) {
	return blogList.reduce((sum, blog) => sum + blog.likes, 0);
}

function favoriteBlog(blogList) {
	if (blogList.length === 0) {
		return null;
	}
	const favorite = blogList.reduce((prev, current) =>
		prev.likes > current.likes ? prev : current,
	);
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
}

function mostBlogs(blogList) {
	if (blogList.length === 0) {
		return null;
	}
	const authorCounts = {};

	// Count the number of blogs for each author
	for (const blog in blogList) {
		const { author } = blogList[blog];
		authorCounts[author] = (authorCounts[author] || 0) + 1;
	}

	// Find the author with the most blogs
	const mostBlogsAuthor = Object.keys(authorCounts).reduce((prev, current) =>
		authorCounts[prev] > authorCounts[current] ? prev : current,
	);

	// Return the author with the most blogs
	return {
		author: mostBlogsAuthor,
		blogs: authorCounts[mostBlogsAuthor],
	};
}

function mostLikes(blogList) {
	if (blogList.length === 0) {
		return null;
	}
	const authorLikes = {};

	// Calculate the total likes for each author
	for (const blog in blogList) {
		const { author, likes } = blogList[blog];
		authorLikes[author] = (authorLikes[author] || 0) + likes;
	}

	// Find the author with the most likes
	const mostLikesAuthor = Object.keys(authorLikes).reduce((prev, current) =>
		authorLikes[prev] > authorLikes[current] ? prev : current,
	);

	// Return the author with the most likes
	return {
		author: mostLikesAuthor,
		likes: authorLikes[mostLikesAuthor],
	};
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
