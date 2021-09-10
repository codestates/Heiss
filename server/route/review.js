const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.review.getAllReview);
router.get("/:id", controller.review.getDetailReview);
router.get("/:id/like", controller.review.getLikeReview);

router.post("/", controller.review.postWriteReview);

router.patch("/:id", controller.review.patchEditReview);

router.delete("/:id", controller.review.deleteReview);

module.exports = router;
