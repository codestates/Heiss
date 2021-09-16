const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getLocker);
router.post("/", controller.postLocker);
router.delete("/:id", controller.deleteLocker);

module.exports = router;
