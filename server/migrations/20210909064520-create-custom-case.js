"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("customCases", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			phoneId: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			setting: {
				type: Sequelize.STRING,
			},
			img: {
				type: Sequelize.STRING,
			},
			cart: {
				type: Sequelize.BOOLEAN,
			},
			locker: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("customCases");
	},
};
