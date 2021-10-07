module.exports = {
	//* user
	oauth: require("./user/oauth"),
	userInfo: require("./user/userInfo"),
	signup: require("./user/signup"),
	emailcode: require("./user/emailcode"),
	emailcheck: require("./user/emailcheck"),
	signin: require("./user/signin"),
	signout: require("./user/signout"),
	findpw: require("./user/find-pw"),
	patchUser: require("./user/patchuser"),
	withdrawal: require("./user/withdrawal"),
	passwordCheck: require("./user/passwordCheck"),

	//* review
	getAllReview: require("./review/getAllReview"),
	getDetailReview: require("./review/getDetailReview"),
	postReview: require("./review/postReview"),
	patchReview: require("./review/patchReview"),
	deleteReview: require("./review/deleteReview"),
	postLikeReview: require("./review/postLikeReview"),

	//* cart
	getCart: require("./cart/getCart"),
	postCart: require("./cart/postCart"),
	patchCart: require("./cart/patchCart"),
	deleteCart: require("./cart/deleteCart"),
	deleteAllCart: require("./cart/deleteAllCart"),

	//* locker
	getLocker: require("./locker/getLocker"),
	postLocker: require("./locker/postLocker"),
	deleteLocker: require("./locker/deleteLocker"),

	//* case
	getCase: require("./case/getCase"),
	postCase: require("./case/postCase"),
	patchCase: require("./case/patchCase"),

	//* order
	postOrder: require("./order/postOrder"),
	getOrder: require("./order/getOrder"),
};
