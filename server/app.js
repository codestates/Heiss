require("dotenv").config();
const { sequelize } = require("./models");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketio = require("socket.io")(server, {
	cors: { origin: "*", credentials: true, methods: ["GET", "POST"] },
});

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

// 1) connect: 연결 성공
// 2) disconnect: 연결 종료
// 3) error: 에러 발생
// 4) 그외 : 사용자 정의 이벤트

//! app.listen 같은게 on
io.on("connection", (socket) => {
	//? 기본연결. emit으로 보내고 on으로 응답하는 구조
	socket.on("on", (data) => {
		console.log(data);
		//? 데이터를 받을때. emit으로 발생된 이벤트에 대한 응답
		io.emit("emit", data); //? 데이터를 보낼때. 이벤트를 발생시키고자 한다면 emit
	});
	console.log("연결완료라는데..?");
});

app.get("/", (req, res) => {
	res.send("hello world~~~");
});

const io = socketio.listen(server);

const PORT = 80;
app.listen(PORT, () => console.log("서버가 열려따..!"));
//sequelize.sync({ alter: true }

//module.exports = server;
