const { review, source, customCase } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res) => {
	const reviewId = req.params.id;
	const { score, title, desc, caseId, deleteUrl } = req.body;
	const accessToken = req.cookies.accessToken;
	const imgUrl = req.files;
	console.log(deleteUrl);
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
			let urlList = [];
			if (deleteUrl) {
				urlList = deleteUrl.split(",");
			}
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
				const findCase = await customCase.findOne({ where: { id: caseId } });
				await source.create({
					reviewId,
					imgUrl: findCase.dataValues.img,
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
