const { cartList } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const { quantity, caseId } = req.body;
	console.log("quantity", quantity);
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		cartList
			.update(
				{ quantity },
				{ where: { customCaseId: caseId, userId: userInfo.id } }
			)
			.then((el) => {
				console.log(el);
				res.status(200).json({ message: "ok" });
			});
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
