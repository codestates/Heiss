const { review, source, users } = require("../../models");

module.exports = {
	getAllReview: async (req, res) => {
		try {
			const reviewList = await review.findAll({
				include: [
					{
						model: users,
						reqiured: true,
						attributes: ["id", "username", "profileImg"],
					},
					{ model: source, reqiured: true, attributes: ["imgUrl"] },
				],
			});
			res.status(201).json({ data: reviewList });
		} catch (err) {
			res.status(500).send(console.log(err));
		}
	},
};
