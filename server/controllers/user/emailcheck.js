const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
	const { code, hashedcode } = req.body;
	console.log(code, hashedcode);

	bcrypt.compare(String(code), String(hashedcode)).then((isMatch) => {
		if (!isMatch) {
			res.status(401).send("code mismatch!");
		} else {
			res.status(200).send("success!");
		}
	});
};
