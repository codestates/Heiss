const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.review.allReview);
router.post("/", controller.review.writeReview);

module.exports = router;
