import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

async function create(newBlog) {
	const config = {
		headers: { Authorization: token },
	};
	try {
		const response = await axios.post(baseUrl, newBlog, config);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function update(blog) {
	const config = {
		headers: { Authorization: token },
	};
	try {
		const blogToUpdate = {
			user: blog.user?.id,
			likes: blog.likes,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		};

		const response = await axios.put(
			`${baseUrl}/${blog.id}`,
			blogToUpdate,
			config,
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function remove(blog) {
	console.log("blog to remove", blog);
	const config = {
		headers: { Authorization: token },
	};
	try {
		const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
		if (response.status === 204) {
			return blog;
		}
		throw "No se ha podido eliminar";
	} catch (error) {
		console.error(error);
	}
}
export default { getAll, setToken, create, update, remove };
