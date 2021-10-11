"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class cartList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	cartList.init(
		{
			userId: DataTypes.INTEGER,
			customCaseId: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "cartList",
		}
	);
	return cartList;
};
