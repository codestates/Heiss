const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.get("/:id", controller.cart.addCart);
