require("dotenv").config();
const https = require("https");
const cors = require("cors");
const fs = require("fs");
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
const HTTPS_PORT = process.env.HTTPS_PORT || 50;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
	const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
	const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
	const credentials = { key: privateKey, cert: certificate };

	server = https.createServer(credentials, app);
	server.listen(HTTPS_PORT, () => console.log("https server runnning"));
} else {
	server = app.listen(HTTPS_PORT, () => console.log("http server running "));
}
