const { like, review, source, users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	postLikeReview: async (req, res) => {
		const accessToken = req.cookies.accessToken;
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const { reviewId } = req.body;
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
			res.status(401).json({ message: "please log in" });
		}
		res.status(500).send(console.log(err));
	},
};
