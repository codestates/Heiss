const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findCase = await customCase.findAll({
			attributes: ["id", "userId", "phoneId", "price", "setting", "img"],
			where: { userId: userInfo.id, cart: 1 },
		});
		if (findCase.length >= 1) {
			res.status(200).json({ data: findCase });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
