require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const userRouter = require("./route/user");
const reviewRouter = require("./route/review");
const { sequelize } = require("./models");
// const cartRouter = require("./route/cart");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);

app.use("/user", userRouter);
app.use("/review", reviewRouter);
// app.use("/cart", cartRouter);

app.get("/", (req, res) => {
	res.send("hello world~~~");
});

const PORT = 80;
const server = app.listen(PORT, () => sequelize.sync({ force: true }));
// console.log("서버가 열려따..!")

module.exports = server;
