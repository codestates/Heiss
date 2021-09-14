const { review, source, users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	postReview: async (req, res) => {
		const accessToken = req.cookies.accessToken;
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const imgUrl = req.files.location; // -> 배열
		const { score, title, desc, caseId } = req.body;
		try {
			if (score && title && desc && caseId) {
				try {
					const newReview = await review.create({
						userId: userInfo.id,
						score,
						title,
						desc,
						caseId,
					});
					// source bulk insert reviewId : newReview.id , imgUrl: imgUrl
					const addSource = await source.bulkCreate([
						{ reviewId: newReview.id },
						{ imgUrl },
					]);
					res.status(200).json({ message: "ok" });
				} catch (err) {
					res.status(400).json({ message: "Failed to write a review" });
				}
			} else {
				res.status(422).json({ message: "insufficient parameters supplied" });
			}
		} catch (err) {
			res.status(500).send(console.log(err));
		}
	},
};
