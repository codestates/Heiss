const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/:id", controller.getCase);
router.post("/", controller.postCase);

module.exports = router;
