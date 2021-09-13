const {
	customcase,
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
				// attributes: ["id", "score", "userId", "caseId", "title", "desc"],
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
				// attributes: ["id", "score", "userId", "caseId", "title", "desc"],
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
			res.status(201).json({ data: detailReview });
		} catch (err) {
			res.status(500).send(console.log(err));
		}
	},

	//! 리뷰 작성하기
	postWriteReview: async (req, res) => {
		// const accessToken = req.cookies.accessToken;
		// const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
		const { score, title, desc, userId } = req.body; // form data 받아야함, userId 뺴야함
		if (score && title && desc) {
			try {
				await review.create({
					userId, // : userInfo.id
					score,
					title,
					desc,
					// caseId: , -> 구매목록?
				});
				res.status(200).json({ message: "ok" });
			} catch (err) {
				res.status(500).json({ message: "server error" });
			}
		} else {
			res.status(422).json({ message: "insufficient parameters supplied" });
		}
	},

	//! 리뷰 수정하기
	patchEditReview: async (req, res) => {
		const reviewId = req.params.id;
		// const accessToken = req.cookies.accessToken;
		// const userInfo = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
		// try{
		//   if(userInfo.id === reviewId.userId){
		//     const
		//   }
		// }catch (err) {
		// 		res.status(500).json({ message: "server error" });
		// 	}
	},

	//! 리뷰 삭제하기
	deleteReview: async (req, res) => {},

	//! 리뷰 좋아요
	getLikeReview: async (req, res) => {},
};
