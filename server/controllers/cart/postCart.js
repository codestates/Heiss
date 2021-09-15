const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const caseId = req.body.caseId;
	const accessToken = req.cookies.accessToken;
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findCase = await customCase.findOne({
			where: { userId: userInfo.id, id: caseId },
		});
		if (findCase) {
			await customCase.update({ cart: true }, { where: { id: caseId } });
			res.status(200).json({ message: "ok" });
		} else {
			res.status(401).json({ message: "Unauthorized request" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
