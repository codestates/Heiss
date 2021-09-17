const jwt = require("jsonwebtoken");
const { users } = require("../../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const imgUrl = req.file.location;
	let { password, newpassword, username } = req.body;
	const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
	const findUser = await users.findOne({
		where: { email: userInfo.email, provider: "normal" },
	});

	try {
		let check = await bcrypt.compare(password, findUser.dataValues.password);
		if (!check) {
			return res.status(401).send();
		} else {
			if (!imgUrl) imgUrl = findUser.dataValues.profileImg;
			if (!username) username = findUser.dataValues.userName;
			if (!newpassword) newpassword = findUser.dataValues.password;
			else if (newpassword) {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newpassword, salt, (err, hash) => {
						if (err) {
							throw err;
						} else {
							users.update(
								{
									profileImg: imgUrl,
									userName: username,
									password: hash,
								},
								{ where: { email: userInfo.email, provider: "normal" } }
							);
							res.status(200).send();
						}
					});
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
};
