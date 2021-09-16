const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const caseId = req.params.id;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const cartCase = await customCase.findAll({
			where: { id: caseId, userId: userInfo.id, cart: true },
		});
		if (cartCase) {
			await customCase.update({ locker: false }, { where: { id: caseId } });
		}
		const findCase = await customCase.findOne({
			where: { id: caseId, userId: userInfo.id },
		});
		if (!findCase.cart) {
			await customCase.destroy({ where: { id: caseId } });
			res.status(200).json({ message: "ok" });
		} else if (findCase.cart) {
			res.status(200).json({ message: "ok" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};