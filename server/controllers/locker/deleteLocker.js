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
		await customCase.update(
			{ locker: false },
			{ where: { id: caseId, userId: userInfo.id } }
		);
		return res.status(200).send();
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
