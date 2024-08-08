import axios from "axios";
import services from "./config";

const endPoint = services.getEndPoint("persons");

const getAll = () => {
	const request = axios.get(endPoint);
	return request.then((response) => response.data);
};

const create = (newPerson) => {
	const request = axios.post(endPoint, newPerson);
	return request.then((response) => response.data);
};

const deletePerson = (id) => {
	const request = axios.delete(`${endPoint}/${id}`);
	return request.then((response) => response.data);
};

const update = (id, newPerson) => {
	const request = axios.put(`${endPoint}/${id}`, newPerson);
	return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, update };
