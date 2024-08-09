import weather from "./weather";
import geocoding from "./geocoding";
import countries from "./countries";

export default {
	...countries,
	...weather,
	...geocoding,
};
