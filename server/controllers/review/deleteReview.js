const { review } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const reviewId = req.params.id;
	console.log(reviewId);
	const accessToken = req.cookies.accessToken;
	const findReview = await review.findOne({ where: { id: reviewId } });
	const findUser = findReview.userId;

	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		if (findUser === userInfo.id) {
			await review.destroy({ where: { id: reviewId } });
			res.status(200).json({ message: "ok" });
		} else if (findUser !== userInfo.id) {
			res.status(401).json({ message: "Unauthorized request" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
