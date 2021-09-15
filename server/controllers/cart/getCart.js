const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
};
