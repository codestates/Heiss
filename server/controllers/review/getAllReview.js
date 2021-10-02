const { review, source, users, like, sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//! SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
module.exports = async (req, res) => {
	try {
		const reviewList = await review.findAll({
			attributes: [
				"id",
				"score",
				"title",
				"desc",
				[
					sequelize.literal(
						"(SELECT COUNT(reviewId) FROM likes WHERE likes.reviewId = review.id)"
					),
					"like",
				],
			],
			include: [
				{
					model: users,
					attributes: ["id", "username", "profileImg"],
				},
				{ model: source, attributes: ["imgUrl"] },
				{
					model: like,
					attributes: [],
				},
			],
			group: "id",
			order: [["id", "desc"]],
		});

		const accessToken = req.cookies.accessToken;
		if (accessToken) {
			const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
			if (userInfo) {
				const userLike = await like.findAll({ where: { userId: userInfo.id } });
				reviewList.forEach((el) => {
					userLike.forEach((el2) => {
						if (el.dataValues.id === el2.dataValues.reviewId) {
							el.dataValues.liked = true;
						}
					});
				});
			}
		}
		res.status(201).json({ data: reviewList });
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
