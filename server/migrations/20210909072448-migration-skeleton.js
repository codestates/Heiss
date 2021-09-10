"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addConstraint("reviews", {
			fields: ["userId"],
			type: "foreign key",
			name: "fk_reviews_users",
			references: {
				table: "users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("reviews", {
			fields: ["caseId"],
			type: "foreign key",
			name: "fk_reviews_customCases",
			references: {
				table: "customCases",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("customCases", {
			fields: ["userId"],
			type: "foreign key",
			name: "fk_customCases_users",
			references: {
				table: "users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("customCases", {
			fields: ["phoneId"],
			type: "foreign key",
			name: "fk_customCases_phones",
			references: {
				table: "phones",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("sources", {
			fields: ["reviewId"],
			type: "foreign key",
			name: "fk_sources_reviews",
			references: {
				table: "reviews",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("likes", {
			fields: ["reviewId"],
			type: "foreign key",
			name: "fk_likes_reviews",
			references: {
				table: "reviews",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		await queryInterface.addConstraint("likes", {
			fields: ["userId"],
			type: "foreign key",
			name: "fk_likes_users",
			references: {
				table: "users",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint("reviews", "fk_sources_reviews");
		await queryInterface.removeConstraint("reviews", "fk_likes_reviews");

		await queryInterface.removeConstraint("users", "fk_likes_users");
		await queryInterface.removeConstraint("users", "fk_customCases_users");
		await queryInterface.removeConstraint("users", "fk_reviews_users");

		await queryInterface.removeConstraint("phones", "fk_customCases_phones");

		await queryInterface.removeConstraint(
			"customCases",
			"fk_reviews_customCases"
		);
	},
};
