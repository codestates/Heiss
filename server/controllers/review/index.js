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
	allReview: async (req, res) => {
		res.send("test");
	},

	//! 특정 리뷰 보기
	detailReview: async (req, res) => {},

	//! 리뷰 작성하기
	writeReview: async (req, res) => {
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
	editReview: async (req, res) => {},

	//! 리뷰 삭제하기
	deleteReview: async (req, res) => {},

	//! 리뷰 좋아요
	likeReview: async (req, res) => {},
};
