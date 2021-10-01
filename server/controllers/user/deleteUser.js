const { users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	try {
		await users.destroy({
			where: { email: userInfo.email, provider: userInfo.provider },
		});
		res.status(200).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
