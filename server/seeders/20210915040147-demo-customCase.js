"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("customCases", [
			{
				userId: 1,
				phoneId: 1,
				price: 15000,
				setting: "보류",
				img: ".img",
				cart: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				userId: 2,
				phoneId: 2,
				price: 30000,
				setting: "보류",
				img: ".img",
				cart: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("customCases", null, {});
	},
};
