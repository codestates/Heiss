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
			where: { userId: userInfo.id, locker: 1 },
		});
		if (findCase) {
			res.status(200).json({ data: findCase });
		} else {
			res.status(404).json({ message: "Your locker is empty" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
