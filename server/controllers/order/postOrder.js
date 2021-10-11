const jwt = require("jsonwebtoken");
const { orderList, orderNumber } = require("../../models");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const orders = req.body;

	const generateRandom = function (min, max) {
		var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return ranNum;
	};

	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);

		const number = generateRandom(11111, 99999);
		let condition;
		switch (number % 3) {
			case 0:
				condition = "주문완료";
				break;
			case 1:
				condition = "배송 중";
				break;
			case 2:
				condition = "배송 완료";
				break;
		}
		const newOrderNumber = await orderNumber.create({
			userId: userInfo.id,
			condition: condition,
			number: number,
		});

		for (let i = 0; i < orders.length; i++) {
			await orderList.create({
				customCaseId: orders[i].customCaseId,
				orderNumberId: newOrderNumber.dataValues.id,
				quantity: orders[i].quantity,
			});
		}
		res.send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
