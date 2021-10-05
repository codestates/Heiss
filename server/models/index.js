"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const {
	users,
	review,
	customCase,
	phone,
	like,
	source,
	orderList,
	orderNumber,
	cartList,
} = sequelize.models;

review.hasMany(source);
source.belongsTo(review);

// phone.belongsTo(customcase);
// customcase.hasMany(phone);

phone.hasOne(customCase);
customCase.belongsTo(phone);

customCase.hasMany(review, { foreignKey: "caseId" });
review.belongsTo(customCase, { foreignKey: "caseId" });

users.hasMany(customCase);
customCase.belongsTo(users);

// users.belongsToMany(review, { through: like });
// review.belongsToMany(users, { through: like });

users.hasMany(like);
like.belongsTo(users);

review.hasMany(like);
like.belongsTo(review);

users.hasMany(review);
review.belongsTo(users);

users.hasMany(orderNumber);
orderNumber.belongsTo(users);

orderNumber.hasMany(orderList);
orderList.belongsTo(orderNumber);

customCase.hasMany(orderList);
orderList.belongsTo(customCase);

users.hasOne(cartList);
cartList.belongsTo(users);

customCase.hasOne(cartList);
cartList.belongsTo(customCase);

module.exports = db;
