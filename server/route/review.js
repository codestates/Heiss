const express = require("express");
const review = express.Router();
const controller = require("../controllers/review");

review.get("/", controller.getAllReview);
review.get("/:id", controller.getDetailReview);

review.post("/like", controller.postLikeReview);
review.post("/", controller.postReview);

review.patch("/:id", controller.patchReview);

review.delete("/:id", controller.deleteReview);

module.exports = review;
