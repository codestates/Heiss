require("dotenv").config();
const nodemailer = require("nodemailer");
const { users } = require("../../models");
const bcrypt = require("bcrypt");

const smtpServerURL = "smtp.daum.net";
const authUser = process.env.EMAIL_ID;
const authPass = process.env.EMAIL_PW;
const fromEmail = "heiss_veri@daum.net";

module.exports = async (req, res) => {
	console.log("잘 들어왔어");
	const email = req.body.email;

	const generateRandom = (min, max) => {
		var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return "heiss" + String(ranNum);
	};
	const findUser = await users.findOne({ where: { email } });
	if (!findUser) {
		res.status(404).json({ message: "No matching users" });
	} else {
		const tmp_pw = generateRandom(1111, 9999);

		let transporter = nodemailer.createTransport({
			host: smtpServerURL, //SMTP 서버 주소
			secure: true, //보안 서버 사용 false로 적용시 port 옵션 추가 필요
			auth: {
				user: authUser, //메일서버 계정
				pass: authPass, //메일서버 비번
			},
		});

		let mailOptions = {
			from: fromEmail,
			to: email,
			subject: "heiss 임시 비밀번호입니다",
			text: `아래 비밀번호를 입력해 주세요
  
  
                  ${tmp_pw}`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				//에러
				console.log(error);
			}
			//전송 완료
			console.log("Finish sending email : " + info.response);
			transporter.close();
		});
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(tmp_pw, salt, async (err, hash) => {
				if (err) {
					throw err;
				} else {
					await users
						.update({ password: hash }, { where: { email: email } })
						.then((result) => {
							res.status(200).send();
						});
				}
			});
		});
	}
};
