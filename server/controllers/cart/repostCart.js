const { cartList } = require("../../models");
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
		const findCase = await customCase.findOne({
			where: { userId: userInfo.id, id: caseId },
		});
		if (findCase) {
			console.log(userInfo.id, caseId);
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
