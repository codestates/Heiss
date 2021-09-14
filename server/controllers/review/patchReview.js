const { review, source } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const reviewId = req.params.id;
	const { score, title, desc, caseId } = req.body;
	const accessToken = req.cookies.accessToken;
	const imgUrl = req.files.location;
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findReview = await review.findOne({ where: { id: reviewId } });
		if (!findReview) {
			res.status(404).json({ message: "Not found post" });
		}
		if (userInfo.id === findReview.dataValues.userId) {
			if (imgUrl) {
				const addSource = await source.bulkCreate([{ reviewId }, { imgUrl }]);
			}
			if (score && title && desc && caseId) {
				await review.update(
					{ score, title, desc, caseId },
					{
						where: { id: reviewId },
					}
				);
				res.status(200).json({ message: "ok" });
			} else {
				res.status(422).json({ message: "insufficient parameters supplied" });
			}
		} else {
			res.status(401).json({ message: "Unauthorized request" });
		}
	} catch (err) {
		res.status(500).send(console.log(err));
	}
};
