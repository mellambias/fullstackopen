import axios from "axios";
import services from "../config";
const endpoint = services.getEndPoint("login");

async function login(credentials) {
	const response = await axios.post(endpoint, credentials);
	return response.data;
}

export default { login };
