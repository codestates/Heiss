const jwt = require("jsonwebtoken");
const { users } = require("../../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	let { userName, newpassword } = req.body;
	let userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	let payload = {};

	if (req.file) {
		userInfo.profileImg = req.file.location;
		payload.profileImg = req.file.location;
	}
	if (userName) {
		userInfo.userName = userName;
		payload.userName = userName;
	}
	if (newpassword) {
		let salt, hash;
		try {
			salt = await bcrypt.genSalt(10);
			hash = await bcrypt.hash(newpassword, salt);
		} catch (err) {
			res.status(500).send(console.log(err));
		}
		payload.password = hash;
	}
	delete userInfo.password;
	try {
		users
			.update(payload, {
				where: { email: userInfo.email, provider: userInfo.provider },
			})
			.then(async () => {
				const accessToken = await jwt.sign(userInfo, process.env.ACCESS_SECRET);
				return res
					.cookie("accessToken", accessToken, { httpOnly: true })
					.status(200)
					.json({ message: "ok" });
			});
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
