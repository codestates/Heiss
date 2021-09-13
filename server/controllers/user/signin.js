const { users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const { email, password } = req.body;
	const findUser = await users.findOne({ where: { email, password } });
	try {
		if (!findUser) {
			res.status(404).json({ message: "No matching users" });
		} else if (findUser) {
			delete findUser.dataValues.password;
			const accessToken = await jwt.sign(
				findUser.dataValues,
				process.env.ACCESS_SECRET
			);
			res
				.status(200)
				.cookie("accessToken", accessToken, {
					httpOnly: true,
				})
				.json({ message: "ok" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
