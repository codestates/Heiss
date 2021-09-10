const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

module.exports = (req, res) => {
	const { authorizationCode, platform } = req.body;
	console.log(authorizationCode);
	console.log(platform);
	console.log(process.env.KAKAO_CLIENT_SECRET);
	if (platform === "kakao") {
		//카카오 로그인

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
					.then((response) => console.log(response))
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	} else if (platform === "naver") {
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
					.then((response) => console.log(response.data));
			})
			.catch((err) => console.log(err));
	}
	res.send(" oauth");
};
//https://kauth.kakao.com/oauth/authorize?client_id=7904e316af3f17cb62573b7acbc2bee1&redirect_uri=http://localhost:3000&response_type=code&state=kakao

//https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=PXdmwzsrOkyH0uRxF3pw&redirect_uri=http://localhost:3000&state=naver
