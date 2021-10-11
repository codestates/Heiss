const jwt = require("jsonwebtoken");
const { orderList, orderNumber, customCase, phone } = require("../../models");
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
					include: [
						{
							model: customCase,
							include: [
								{
									model: phone,
								},
							],
						},
					],
				},
			],
		});

		let data = [];
		for (let i = 0; i < getList.length; i++) {
			let tmp = {
				orderNumber: getList[i].number,
				condition: getList[i].condition,
				orderList: [],
			};
			for (let j = 0; j < getList[i].orderLists.length; j++) {
				let tmp2 = {
					customCaseId: getList[i].orderLists[j].dataValues.customCaseId,
					quantity: getList[i].orderLists[j].dataValues.quantity,
					price:
						getList[i].orderLists[j].dataValues.quantity *
						getList[i].orderLists[j].dataValues.customCase.price,
					img: getList[i].orderLists[j].dataValues.customCase.img,
					phone_type: getList[i].orderLists[j].dataValues.customCase.phone.type,
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
