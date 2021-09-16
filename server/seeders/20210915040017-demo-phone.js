"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("phones", [
			{
				type: "아이폰",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				type: "갤럭시",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("phones", null, {});
	},
};
