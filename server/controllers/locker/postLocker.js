const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const img = req.file;
	const { phoneId, price, setting } = req.body;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		if (phoneId && price && setting && img) {
			await customCase.create({
				userId: userInfo.id,
				phoneId,
				price,
				setting,
				img,
				cart: false,
				locker: true,
			});
			res.status(200).json({ message: "ok" });
		} else {
			res.status(422).json({ message: "insufficient parameters supplied" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};