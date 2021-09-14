const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getAllReview);
router.get("/:id", controller.getDetailReview);

router.post("/like", controller.postLikeReview);
router.post("/", controller.postReview);

router.patch("/:id", controller.patchReview);

router.delete("/:id", controller.deleteReview);

module.exports = router;
