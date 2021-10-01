const { review, source } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const reviewId = req.params.id;
	const { score, title, desc, caseId, deleteUrl } = req.body;
	const accessToken = req.cookies.accessToken;
	const imgUrl = req.files;

	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const findReview = await review.findOne({
			where: { id: reviewId },
			include: [{ model: source, attributes: ["imgUrl"] }],
		});
		if (!findReview) {
			res.status(404).json({ message: "Not found post" });
		}
		if (userInfo.id === findReview.dataValues.userId) {
			console.log(findReview);
			let urlList = deleteUrl.split(",");
			if (urlList.length) {
				for (let url of urlList) {
					await source.destroy({ where: { reviewId, imgUrl: url } });
				}
			}
			if (imgUrl.length) {
				for (let i = 0; i < imgUrl.length; i++) {
					await source.create({
						reviewId,
						imgUrl: imgUrl[i].location,
					});
				}
			} else if (
				!imgUrl.length &&
				!(findReview.dataValues.sources.length - urlList.length)
			) {
				await source.create({
					reviewId,
					imgUrl:
						"https://heiss-images.s3.ap-northeast-2.amazonaws.com/1632811597118.png",
				});
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
