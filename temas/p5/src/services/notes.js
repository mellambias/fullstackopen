import axios from "axios";
import services from "../config";

const endpoint = services.getEndPoint("notes");

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getAll = async () => {
	const notes = await axios.get(endpoint);
	return notes.data;
};

const create = async (newNote) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(endpoint, newNote, config);
	return response.data;
};

const update = (id, newNote) => {
	const request = axios.put(`${endpoint}/${id}`, newNote);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
	setToken,
};
