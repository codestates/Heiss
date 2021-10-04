const { customCase } = require("../../models");
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
		const cartCase = await customCase.findOne({
			where: { id: caseId, userId: userInfo.id, locker: true },
		});
		if (cartCase) {
			if (!cartCase.cart) {
				await customCase.destroy({ where: { id: caseId } });
				return res.status(200).json({ message: "ok" });
			}
			await customCase.update({ locker: false }, { where: { id: caseId } });
			return res.status(200).send();
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
