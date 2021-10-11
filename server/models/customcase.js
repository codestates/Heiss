"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class customCase extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	customCase.init(
		{
			userId: DataTypes.INTEGER,
			phoneId: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			setting: DataTypes.JSON,
			img: DataTypes.STRING,
			locker: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "customCase",
		}
	);
	return customCase;
};
