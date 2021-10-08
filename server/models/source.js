"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class source extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	source.init(
		{
			// reviewId: DataTypes.INTEGER,
			imgUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "source",
		}
	);
	return source;
};