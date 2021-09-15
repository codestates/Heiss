const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	try {
		const findCase = await customCase.findAll({
			where: { userId: userInfo.id, cart: 1 },
		});
		if (findCase.length >= 1) {
			res.status(200).json({ data: findCase });
		} else {
			res.status(404).json({ message: "Your shopping cart is empty" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
