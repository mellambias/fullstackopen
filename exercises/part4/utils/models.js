/*
Utilidades para los modelos
*/

function apliBlackList(document, blackList) {
	const newDodument = Object.keys(document)
		.filter((key) => !blackList.includes(key))
		.reduce((obj, key) => {
			obj[key] = document[key];
			return obj;
		}, {});
	return newDodument;
}

module.exports = {
	apliBlackList,
};
