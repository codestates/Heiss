const { cartList } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const caseId = req.params.id;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findCase = await cartList.findOne({
			where: { userId: userInfo.id, customCaseId: caseId },
		});
		await cartList.destroy({
			where: {
				id: findCase.dataValues.id,
				customCaseId: findCase.dataValues.customCaseId,
			},
		});
		return res.status(200).json({ message: "ok" });
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
