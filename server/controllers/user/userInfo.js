const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(200).json({ message: "not found" });
	}
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	console.log(userInfo);
	res.status(200).json({ userInfo });
};
