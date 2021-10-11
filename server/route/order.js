const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/", controller.postOrder);
router.get("/", controller.getOrder);

module.exports = router;
