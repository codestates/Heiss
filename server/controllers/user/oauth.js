module.exports = (req, res) => {
	const { authorizationCode, platform } = req.body;
	console.log(authorizationCode);
	console.log(platform);
	res.send(" oauth");
};
