const { cartList, customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const caseId = req.body.caseId;

	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const a = await cartList.findOne({
			where: { customCaseId: caseId, userId: userInfo.id },
		});
		if (a) {
			return res.status(200).json({ message: "conflict" });
		}
		const findCase = await customCase.findOne({
			where: { userId: userInfo.id, id: caseId },
		});
		if (findCase) {
			await cartList.create({
				userId: userInfo.id,
				customCaseId: caseId,
				quantity: 1,
			});
			return res.status(200).json({ message: "ok!!!" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
