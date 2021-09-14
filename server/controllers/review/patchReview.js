const { like, review, source, users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	patchReview: async (req, res) => {
		const reviewId = req.params.id;
		const { score, title, desc, caseId } = req.body;
		const accessToken = req.cookies.accessToken;
		const imgUrl = req.files.location;
		try {
			const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
			if (userInfo.id === reviewId.userId) {
				try {
					if (score && title && desc && caseId) {
						await review.update(
							{ score, title, desc, caseId },
							{
								where: { id: reviewId },
							}
						);
						res.status(200).json({ message: "ok" });
					}
				} catch (err) {
					res.status(422).json({ message: "insufficient parameters supplied" });
				}
				if (imgUrl) {
					const addSource = await source.bulkCreate([{ reviewId }, { imgUrl }]);
				}
			}
		} catch (err) {
			res.status(401).json({ message: "Unauthorized request" });
		}
	},
};
