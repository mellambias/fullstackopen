import axios from "axios";
import env from "../env";

const endPoint = "https://api.openweathermap.org/data/2.5/weather";
function getWeather(lat, lon) {
	const request = axios.get(
		`${endPoint}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${env.openweathermap.KEY}`,
	);
	return request.then((response) => response.data);
}

export default {
	getWeather,
};
