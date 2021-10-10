const { users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const { password, provider } = req.body;
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	let { email } = userInfo;
	const findUser = await users.findOne({
		where: { email, provider: userInfo.provider },
	});
	try {
		let check = await bcrypt.compare(password, findUser.password);
		if (check) {
			await users.destroy({
				where: { email: userInfo.email, provider: userInfo.provider },
			});
			res
				.cookie("accessToken", "", { httpOnly: true, maxAge: 1 })
				.status(200)
				.json({ message: "ok" });
		} else if (!check) {
			res.status(200).json({ message: "not found" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
