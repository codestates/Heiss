require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
// const multer = require("multer");
// const form_data = multer();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const userRouter = require("./route/user");
const reviewRouter = require("./route/review");

app.use(express.json());
app.use(morgan("tiny"));
// app.use(form_data.array());
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

app.get("/", (req, res) => {
	res.send("hello world~~~");
});

const PORT = 80;
const server = app.listen(PORT, () => console.log("서버가 열려따..!"));

module.exports = server;
