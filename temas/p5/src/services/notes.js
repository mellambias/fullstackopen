import axios from "axios";
import services from "../config";

const endpoint = services.getEndPoint("notes");

const getAll = () => {
	const request = axios.get(endpoint);
	const nonExisting = {
		id: 1000,
		content: "This note is not saved on the server",
		important: true,
	};
	return request.then((response) => response.data.concat(nonExisting));
};

const create = (newNote) => {
	const request = axios.post(endpoint, newNote);
	return request.then((response) => response.data);
};

const update = (id, newNote) => {
	const request = axios.put(`${endpoint}/${id}`, newNote);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
};
