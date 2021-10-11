const { like } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const { reviewId } = req.body;
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		return res.status(401).json({ message: "please log in" });
	}
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	try {
		if (userInfo) {
			const likeCheck = await like.findOne({
				where: { userId: userInfo.id, reviewId },
			});
			if (likeCheck) {
				await like.destroy({ where: { userId: userInfo.id, reviewId } });
				res.status(200).json({ message: "Like has been canceled" });
			} else if (!likeCheck) {
				await like.create({ userId: userInfo.id, reviewId });
				res.status(201).json({ message: "Like Done" });
			}
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
