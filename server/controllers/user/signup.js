const model = require("../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
	const { email, username, password, provider } = req.body;
	// console.log(req.files);
	let user = await model.users.findOne({ where: { email: email } });
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
							userName: username,
							email: email,
							provider: provider,
							password: hash,
							// profileImg: req.file.location,
						})
						.then((result) => {
							res.status(200).send();
						});
				}
			});
		});
	}
};
