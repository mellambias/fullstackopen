const bcrypt = require("bcrypt");
(async function create() {
	if (process.argv.length < 2) {
		console.log("Hacen falta argumentos");
		process.exit(1);
	}

	const hash = await bcrypt.hash(process.argv[2], 10);
	const isOk = await bcrypt.compare(process.argv[2], hash);
	console.log(`Nuevo hash para "${process.argv[2]}"`);
	console.log(hash);
	console.log(`[${isOk ? "verificado" : "Error"}] `);
})();
