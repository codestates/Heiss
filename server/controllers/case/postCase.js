const { customCase, review } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//* 리뷰에서 케이스 퍼오기
module.exports = async (req, res) => {
	const reviewId = req.body.id;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findReview = await review.findOne({ where: { id: reviewId } });
		if (!findReview) {
			res.status(404).json({ message: "Not found" });
		}
		const findCase = await customCase.findOne({
			where: { id: findReview.caseId },
		});
		const { phoneId, price, setting, img } = findCase.dataValues;
		await customCase.create({
			userId: userInfo.id,
			phoneId,
			price,
			setting,
			img,
			cart: false,
			locker: true,
		});
		res.status(200).json({ message: "ok" });
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
