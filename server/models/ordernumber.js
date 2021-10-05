"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class orderNumber extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	orderNumber.init(
		{
			userId: DataTypes.INTEGER,
			condition: DataTypes.STRING,
			number: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "orderNumber",
		}
	);
	return orderNumber;
};
