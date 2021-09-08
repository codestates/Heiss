require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
	})
);

app.get("/", (req, res) => {
	res.send("hello world~~~");
});
const PORT = 80;

const server = app.listen(PORT, () => {});

module.exports = server;
