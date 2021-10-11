"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("likes", [
			{
				reviewId: 1,
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				reviewId: 2,
				userId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("likes", null, {});
	},
};
