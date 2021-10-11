const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const upload = require("../middleware/upload");

router.get("/:id", controller.getCase);
router.post("/", controller.postCase);
router.patch("/:id", upload.single("picture"), controller.patchCase);

module.exports = router;
