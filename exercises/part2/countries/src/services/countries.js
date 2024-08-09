import axios from "axios";

//'https://studies.cs.helsinki.fi/restcountries/api/all'
const endPoint = "https://studies.cs.helsinki.fi/restcountries/api/all";
function getAllConuntries() {
	const request = axios.get(`${endPoint}`);
	return request.then((response) => response.data);
}

export default {
	getAllConuntries,
};
