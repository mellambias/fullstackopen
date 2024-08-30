import axios from "axios";

const baseUlr = "/api/login";
async function login(username, password) {
	const response = await axios.post(baseUlr, { username, password });
	return response.data;
}

export default { login };
