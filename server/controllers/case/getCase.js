const { customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//* 케이스 수정하기
module.exports = async (req, res) => {
	const caseId = req.params.id;
	const accessToken = req.cookies.accessToken;
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findCase = await customCase.findOne({
			attributes: ["id", "userId", "phoneId", "price", "setting"],
			where: { id: caseId, userId: userInfo.id },
		});
		if (findCase) {
			res.status(200).json({ data: findCase });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
