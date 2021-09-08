const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/oauth", controller.oauth);
module.exports = router;
