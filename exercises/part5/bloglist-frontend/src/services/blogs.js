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
	console.log("token", token);
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

export default { getAll, setToken, create };
