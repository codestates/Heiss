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
		const findCase = await customCase.findOne({
			where: { userId: userInfo.id, id: caseId },
		});
		if (!findCase.locker) {
			await customCase.update({ locker: true }, { where: { id: caseId } });
		}
		if (findCase) {
			await customCase.update({ cart: false }, { where: { id: caseId } });
			res.status(200).json({ message: "ok" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
