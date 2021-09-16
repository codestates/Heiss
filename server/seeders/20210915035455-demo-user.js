"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("users", [
			{
				username: "방예은",
				email: "byebye0602@gmail.com",
				password: "12",
				profileImg: "img",
				provider: "normal",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "로봇",
				email: "로봇@gmail.com",
				password: "12",
				profileImg: "img",
				provider: "normal",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
	},
};
