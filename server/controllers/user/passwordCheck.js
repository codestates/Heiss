const jwt = require("jsonwebtoken");
const { users } = require("../../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	let { password } = req.body;
	const findUser = await users.findOne({
		where: { email: userInfo.email, provider: userInfo.provider },
	});

	try {
		let check = await bcrypt.compare(password, findUser.dataValues.password);
		if (check) {
			return res.status(200).json({ message: "ok" });
		} else {
			return res.status(401).send();
		}
	} catch (err) {
		console.log(err);
	}
};
