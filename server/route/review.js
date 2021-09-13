const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.review.getAllReview);
router.get("/:id", controller.review.getDetailReview);

router.post("/like", controller.review.postLikeReview);
router.post("/", controller.review.postReview);

router.patch("/:id", controller.review.patchReview);

router.delete("/:id", controller.review.deleteReview);

module.exports = router;
