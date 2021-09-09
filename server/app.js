require("dotenv").config();
const cors = require("cors");
const userRouter = require("./route/user");
const express = require("express");
const app = express();

app.use(express.json());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);
app.use("/user", userRouter);

app.get("/", (req, res) => {
	res.send("hello world~~~");
});
const PORT = 80;

const server = app.listen(PORT, () => console.log("서버가 열려따..!"));

module.exports = server;
