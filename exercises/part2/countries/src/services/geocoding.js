import axios from "axios";
import env from "../env";

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const endPoint = "http://api.openweathermap.org/geo/1.0/direct";
function getGeoCoding(cityName) {
	const request = axios.get(
		`${endPoint}?q=${cityName}&appid=${env.openweathermap.KEY}`,
	);
	return request.then((response) => response.data[0]);
}

export default {
	getGeoCoding,
};
