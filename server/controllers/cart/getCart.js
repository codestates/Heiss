const { customCase, cartList, phone } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findCase = await cartList.findAll({
			attributes: ["quantity"],
			include: [
				{
					model: customCase,
					attributes: ["id", "price", "img", "phoneId"],
					include: [{ model: phone, attributes: ["type"] }],
				},
			],
			where: { userId: userInfo.id },
		});
		res.status(200).json({ data: findCase });
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
