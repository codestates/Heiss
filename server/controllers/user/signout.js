module.exports = (req, res) => {
	res
		.cookie("accessToken", "", {
			httpOnly: true,
			maxAge: 1,
		})
		.status(200)
		.json({ message: "ok" });
};
