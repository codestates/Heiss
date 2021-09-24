const { review, source } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	// const accessToken = req.cookies.accessToken;
	// if (!accessToken) {
	// 	res.status(401).json({ message: "please signin" });
	// }
	// const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	const imgUrl = req.files; // -> 배열
	console.log(req.body);
	console.log(req);
	const { score, title, desc, caseId, userId } = req.body;
	try {
		if (score && title && desc && caseId) {
			try {
				const newReview = await review.create({
					// userId: userInfo.id,
					score,
					title,
					desc,
					caseId,
				});
				if (imgUrl) {
					for (let i = 0; i < imgUrl.length; i++) {
						await source.create({
							reviewId: newReview.id,
							imgUrl: imgUrl[i].location,
						});
					}
				}
				res.status(200).json({ message: "ok" });
			} catch (err) {
				console.log(err);
				res.status(400).json({ message: "Failed to write a review" });
			}
		} else {
			res.status(422).json({ message: "insufficient parameters supplied" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
