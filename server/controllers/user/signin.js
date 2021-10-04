const { users } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const { email, password } = req.body;
	const findUser = await users.findOne({
		where: { email, provider: "normal" },
	});

	try {
		if (!findUser) {
			res.status(200).json({ message: "No matching users" });
		} else if (findUser) {
			let check = await bcrypt.compare(password, findUser.dataValues.password);
			if (!check) {
				return res.status(200).json({ message: "password err" });
			} else if (check) {
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
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
