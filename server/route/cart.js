const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getCart);
router.post("/", controller.postCart);
router.delete("/:id", controller.deleteCart);

module.exports = router;
