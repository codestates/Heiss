const { cartList } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);

		await cartList.destroy({
			where: {
				userId: userInfo.id,
			},
		});
		return res.status(200).json({ message: "ok" });
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
