const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const upload = require("../middleware/upload");

router.get("/signout", controller.signout);
router.get("/", controller.userInfo);

router.post("/oauth", controller.oauth);
router.post("/signup", upload.single("picture"), controller.signup);
router.post("/emailcode", controller.emailcode);
router.post("/emailcheck", controller.emailcheck);
router.post("/signin", controller.signin);
router.post("/find-pw", controller.findpw);
router.post("/withdrawal", controller.withdrawal);
router.post("/passwordCheck", controller.passwordCheck);
router.patch("/", upload.single("picture"), controller.patchUser);

module.exports = router;
