const jwt = require("jsonwebtoken");
const { orderList, orderNumber } = require("../../models");
require("dotenv").config();

module.exports = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!accessToken) {
		res.status(401).json({ message: "please log in" });
	}
	try {
		const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
		const getList = await orderNumber.findAll({
			where: { userId: userInfo.id },
			include: [
				{
					model: orderList,
				},
			],
		});
		let data = [];
		for (let i = 0; i < getList.length; i++) {
			let tmp = {
				orderNumber: getList[i].id,
				orderList: [],
			};
			for (let j = 0; j < getList[i].orderLists.length; j++) {
				let tmp2 = {
					customCaseId: getList[i].orderLists[j].dataValues.customCaseId,
					quantity: getList[i].orderLists[j].dataValues.quantity,
				};
				tmp.orderList.push(tmp2);
			}
			data.push(tmp);
		}
		res.status(200).send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};
