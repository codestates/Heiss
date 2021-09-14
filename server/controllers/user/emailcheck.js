const bcrypt = require("bcrypt");

module.exports = (req, res) => {
	const { code } = req.body;
	const { hashedcode } = req.body;

	bcrypt.compare(code, hashedcode).then((isMatch) => {
		if (!isMatch) {
			res.status(401).send("code mismatch!");
		} else {
			res.status(200).send("success!");
		}
	});
};
