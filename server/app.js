require("dotenv").config();
const { sequelize } = require("./models");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const userRouter = require("./route/user");
const reviewRouter = require("./route/review");
const cartRouter = require("./route/cart");
const lockerRouter = require("./route/locker");
const caseRouter = require("./route/case");

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
app.use("/cart", cartRouter);
app.use("/locker", lockerRouter);
app.use("/case", caseRouter);

app.get("/", (req, res) => {
	res.send("hello world~~~");
});

//! socket
// 1) connect: 연결 성공
// 2) disconnect: 연결 종료
// 3) error: 에러 발생
// 4) 그외 : 사용자 정의 이벤트

const io = require("socket.io")(server, {
	cors: {
		origin: ["http://localhost:3000"],
		credentials: true,
		// methods: ["GET", "POST"],
	},
});

//* app.listen 같은게 on
io.on("connection", (socket) => {
	socket.on("online", (userInfo) => {
		console.log('received: "' + userInfo + '" from client' + socket.id);
		socket.emit("online", "Ok, i got it, " + socket.id);
	});

	socket.on("chat", () => {});

	socket.on("disconnect", () => {
		console.log(socket.id, "연결끊김");
	});
});

const PORT = 80;
server.listen(PORT, () => console.log("서버가 열려따..!"));
//sequelize.sync({ alter: true }
