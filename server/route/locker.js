const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const upload = require("../middleware/upload");

router.get("/", controller.getLocker);
router.post("/", upload.single("picture"), controller.postLocker);
router.delete("/:id", controller.deleteLocker);

module.exports = router;
