const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const img = req.file.location;
	const caseId = req.params.id;
	const { setting } = req.body;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		if (caseId && setting && img) {
			await customCase.update(
				{
					userId: userInfo.id,
					setting,
					img,
				},
				{ where: { userId: userInfo.id, id: caseId } }
			);
			res.status(200).json({ message: "ok" });
		} else if (!caseId) {
			res.status(404).json({ message: "not found" });
		} else {
			res.status(422).json({ message: "insufficient parameters supplied" });
		}
	} catch (err) {
		res.status(500).send();
	}
};
