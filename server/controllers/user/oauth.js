const dotenv = require("dotenv");
const axios = require("axios");
const model = require("../../models");
const jwt = require("jsonwebtoken");
dotenv.config();
axios.defaults.withCredentials = true;

module.exports = (req, res) => {
	const { authorizationCode, platform } = req.body;
	console.log("~~~~~~oauth~~~~~");
	if (platform === "kakao") {
		axios
			.post(
				`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&code=${authorizationCode}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`,
				{
					headers: {
						"Content-type": "application/x-www-form-urlencoded",
					},
				}
			)
			.then((response) => {
				const { access_token, refresh_token } = response.data;
				axios
					.get("https://kapi.kakao.com/v2/user/me", {
						headers: {
							Authorization: `Bearer ${access_token}`,
							"Content-type": "application/x-www-form-urlencoded",
						},
					})
					.then(async (response) => {
						const email = response.data.kakao_account.email;
						const username = response.data.properties.nickname;
						const profileImage = response.data.properties.profile_image;
						try {
							console.log(email);
							let user = await model.users.findOne({
								where: { email: email, provider: "kakao" },
							});

							if (user) {
								console.log("가입되어있는 kakao 유저. 바로 로그인 진행");
							} else {
								console.log("첫 로그인 kakao, DB 저장 후 로그인 진행");
								await model.users.create({
									userName: username,
									email: email,
									profileImg: profileImage,
									provider: "kakao",
								});
							}
							const findUser = await model.users.findOne({
								where: { email: email, provider: "kakao" },
							});
							delete findUser.dataValues.password;
							const accessToken = await jwt.sign(
								findUser.dataValues,
								process.env.ACCESS_SECRET
							);
							res
								.status(200)
								.cookie("accessToken", accessToken, {
									httpOnly: true,
								})
								.json({ message: "ok" });
						} catch (err) {
							console.log("kakao DB 입출력 오류");
							res.send("kakao DB 입출력 오류");
						}
					})
					.catch((err) => {
						console.log(err);
						res.send("kakao 유저 정보 가져오기 오류");
					});
			})
			.catch((err) => {
				console.log(err);
				res.send("kakao accesstoken 받기 오류");
			});
	} else if (platform === "naver") {
		//네이버 로그인
		axios
			.get("https://nid.naver.com/oauth2.0/token", {
				params: {
					grant_type: "authorization_code",
					client_id: process.env.NAVER_CLIENT_ID,
					client_secret: process.env.NAVER_CLIENT_SECRET,
					redirect_uri: process.env.REDIRECT_URI,
					code: authorizationCode,
					state: "naver",
				},
			})
			.then((response) => {
				const { access_token, refresh_token } = response.data;
				axios
					.get("https://openapi.naver.com/v1/nid/me", {
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					})
					.then(async (response) => {
						const email = response.data.response.email;
						const username = response.data.response.nickname;
						const profileImage = response.data.response.profile_image;

						try {
							let user = await model.users.findOne({
								where: { email: email, provider: "naver" },
							});
							if (user) {
								console.log("가입되어있는 naver 유저. 바로 로그인 진행");
							} else {
								console.log("첫 로그인 naver, DB 저장 후 로그인 진행");
								await model.users.create({
									userName: username,
									email: email,
									profileImg: profileImage,
									provider: "naver",
								});
							}
							const findUser = await model.users.findOne({
								where: { email: email, provider: "naver" },
							});
							delete findUser.dataValues.password;
							const accessToken = await jwt.sign(
								findUser.dataValues,
								process.env.ACCESS_SECRET
							);
							res
								.status(200)
								.cookie("accessToken", accessToken, {
									httpOnly: true,
								})
								.json({ message: "ok" });
						} catch (err) {
							console.log(err);
							res.send("naver DB 입출력 에러");
						}
					})
					.catch((err) => {
						console.log(err);
						res.send("naver 유저 정보 받기 에러");
					});
			})
			.catch((err) => {
				console.log(err);
				res.send("naver 토큰 받기 에러");
			});
	}
};
//https://kauth.kakao.com/oauth/authorize?client_id=7904e316af3f17cb62573b7acbc2bee1&redirect_uri=http://localhost:3000&response_type=code&state=kakao

//https://kauth.kakao.com/oauth/authorize?client_id=7904e316af3f17cb62573b7acbc2bee1&redirect_uri=https://heiss.shop&response_type=code&state=kakao

//https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=PXdmwzsrOkyH0uRxF3pw&redirect_uri=http://localhost:3000&state=naver
