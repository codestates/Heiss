const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const upload = require("../middleware/upload");

router.post("/oauth", controller.oauth);
router.post("/signup", upload.single("picture"), controller.signup);
router.post("/emailcode", controller.emailcode);
router.post("/emailcheck", controller.emailcheck);
module.exports = router;
