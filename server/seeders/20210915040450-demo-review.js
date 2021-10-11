"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("reviews", [
			{
				score: 5,
				userId: 1,
				caseId: 1,
				title: "후기",
				desc: "나름좋네요",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				score: 4,
				userId: 2,
				caseId: 2,
				title: "로봇의 후기",
				desc: "쏘소합니다",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("reviews", null, {});
	},
};
