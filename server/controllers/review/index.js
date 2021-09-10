const {
	customCase,
	like,
	phone,
	review,
	source,
	users,
} = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
	//! 전체 리뷰 보기
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

	//! 특정 리뷰 보기
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

	//! 리뷰 작성하기
	postWriteReview: async (req, res) => {
		const accessToken = req.cookies.accessToken;
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
		// const imgUrl = req.files.location // 배열
		const { score, title, desc, userId, caseId } = req.body;
		if (score && title && desc && caseId) {
			try {
				const newReview = await review.create({
					userId, // : userInfo.id
					score,
					title,
					desc,
					caseId,
				});
				const source = await source;
				// source bulk insert reviewId : newReview.id , imgUrl: imgUrl
				res.status(200).json({ message: "ok" });
			} catch (err) {
				res.status(500).send(console.log(err));
			}
		} else {
			res.status(422).json({ message: "insufficient parameters supplied" });
		}
	},

	//! 리뷰 수정하기
	patchEditReview: async (req, res) => {
		const reviewId = req.params.id;
		const { score, title, desc, caseId } = req.body;
		const accessToken = req.cookies.accessToken;
		try {
			const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
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
			}
		} catch (err) {
			res.status(401).json({ message: "Unauthorized request" });
		}
	},

	//! 리뷰 삭제하기
	deleteReview: async (req, res) => {
		const reviewId = req.params.id;
		const accessToken = req.cookies.accessToken;
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
		const findReview = await review.findOne({ where: { id: reviewId } });
		const findUser = findReview.userId;

		try {
			if (findUser === userInfo.id) {
				await review.destroy({ where: { id: reviewId } });
				res.status(200).json({ message: "ok" });
			} else if (findUser !== userInfo.id) {
				res.status(401).json({ message: "Unauthorized request" });
			}
		} catch (err) {
			res.status(500).send(console.log(err));
		}
	},

	//! 리뷰 좋아요
	AddLikeReview: async (req, res) => {
		const accessToken = req.cookies.accessToken;
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
		const { reviewId } = req.body;
		// const  = await like.create({ reviewId, userId: userInfo.id });
	},
};
