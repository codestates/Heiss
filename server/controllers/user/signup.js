const model = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	const { email, username, password, provider } = req.body;
	// console.log(req.files);
	let user = await model.users.findOne({
		where: { email, provider },
	});
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

							// profileImg: req.file.location,
						})
						.then(async (result) => {
							let payload = {
								id: result.id,
								username,
								email,
								provider,

								// profileImg: req.file.location,
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
