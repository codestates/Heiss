const {
	review,
	source,
	users,
	like,
	phone,
	customCase,
} = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const reviewId = req.params.id;
	try {
		const detailReview = await review.findOne({
			attributes: ["id", "score", "title", "desc", "createdAt"],
			where: { id: reviewId },
			include: [
				{
					model: users,
					attributes: ["id", "username", "profileImg"],
				},
				{ model: source, attributes: ["imgUrl"] },
				{ model: like },
				{
					model: customCase,
					attributes: ["id", "price", "setting", "img"],
					include: [{ model: phone, attributes: ["type"] }],
				},
			],
		});

		const accessToken = req.cookies.accessToken;
		if (accessToken) {
			const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
			const userLike = await like.findOne({
				where: { userId: userInfo.id, reviewId },
			});
			if (userLike) {
				detailReview.dataValues.liked = true;
			}
		}
		if (!detailReview) {
			res.status(404).json({ message: "Post not found" });
		} else {
			detailReview.dataValues.like = detailReview.dataValues.likes.length;
			delete detailReview.dataValues.likes;
			res.status(201).json({ data: detailReview });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
