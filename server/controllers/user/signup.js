const model = require("../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
	const { email, username, password, provider } = req.body;
<<<<<<< HEAD
	// console.log(req.file);
=======
	// console.log(req.files);
>>>>>>> 306594b39de65fdee8a7f658aac8886fb4c1b208
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
<<<<<<< HEAD
					// const image = fs.readFileSync(req.file.path);
=======
>>>>>>> 306594b39de65fdee8a7f658aac8886fb4c1b208
					model.users
						.create({
							userName: username,
							email: email,
							provider: provider,
							password: hash,
<<<<<<< HEAD
							// profileImg: image,
=======
							profileImg: req.file.location,
>>>>>>> 306594b39de65fdee8a7f658aac8886fb4c1b208
						})
						.then((result) => {
							res.status(200).send();
						});
				}
			});
		});
	}
};
