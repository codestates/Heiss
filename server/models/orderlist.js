"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class orderList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	orderList.init(
		{
			customCaseId: DataTypes.INTEGER,
			orderNumberId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "orderList",
		}
	);
	return orderList;
};
