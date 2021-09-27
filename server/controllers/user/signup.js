const model = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const { email, username, password, provider } = req.body;
	const img = req.file;
	console.log(img);
	let profileImg =
		"http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";
	let user = await model.users.findOne({
		where: { email, provider },
	});
	if (img) {
		profileImg = req.file.location;
	}

	if (user) {
		//email 중복
		res.status(409).send();
	} else {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					throw err;
				} else {
					model.users
						.create({
							username,
							email,
							provider,
							password: hash,
							profileImg,
						})
						.then(async (result) => {
							console.log(result);
							let payload = {
								id: result.id,
								username,
								email,
								provider,
								profileImg,
							};
							const accessToken = await jwt.sign(
								payload,
								process.env.ACCESS_SECRET
							);
							res
								.cookie("accessToken", accessToken, {
									httpOnly: true,
								})
								.status(200)
								.send();
						});
				}
			});
		});
	}
};
