const jwt = require("jsonwebtoken");
const { orderList, orderNumber } = require("../../models");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const { customCaseId, quantity } = req.body;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const newOrderNumber = await orderNumber.create({
			userId: userInfo.id,
			condition: "주문완료",
		});

		const newOrderList = await orderList.create({
			customCaseId: customCaseId,
			orderNumberId: newOrderNumber.dataValues.id,
			quantity: quantity,
		});
		res.send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
