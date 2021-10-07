const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getCart);
router.post("/", controller.postCart);
router.patch("/", controller.patchCart);
router.delete("/:id", controller.deleteCart);
router.delete("/", controller.deleteAllCart);

module.exports = router;
