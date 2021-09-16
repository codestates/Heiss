const { review, source } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	const imgUrl = req.files; // -> 배열
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
				// for (let i = 0; i < imgUrl.length; i++) {
				// 	await source.create({
				// 		reviewId: newReview.id,
				// 		imgUrl: imgUrl[i].location,
				// 	});
				// }
				// if(imgUrl){
				// 	const img = imgUrl.map((url) => {
				// 		return { reviewId: newReview.id, imgUrl: url.location };
				// 	});
				// }
				// await source.bulkCreate(img);
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
