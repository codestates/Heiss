const { review, source, users } = require("../../models");

module.exports = {
	getDetailReview: async (req, res) => {
		const reviewId = req.params.id;
		try {
			const detailReview = await review.findOne({
				where: { id: reviewId },
				include: [
					{
						model: users,
						reqiured: true,
						attributes: ["id", "username", "profileImg"],
					},
					{ model: source, reqiured: true, attributes: ["imgUrl"] },
				],
			});
			if (detailReview) {
				res.status(201).json({ data: detailReview });
			} else if (!detailReview) {
				res.status(404).json({ message: "Post not found" });
			}
		} catch (err) {
			res.status(500).send(console.log(err));
		}
	},
};
