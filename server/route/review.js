const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const upload = require("../middleware/upload");

router.get("/", controller.getAllReview);
router.get("/:id", controller.getDetailReview);

router.post("/like", controller.postLikeReview);
router.post("/", upload.array("picture", 10), controller.postReview);

router.patch("/:id", upload.array("picture", 10), controller.patchReview);

router.delete("/:id", controller.deleteReview);

module.exports = router;
