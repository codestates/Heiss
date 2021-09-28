import React, { useState, useEffect } from "react";
import styled from "styled-components";

import socketio from "socket.io-client";

const ChatDiv = styled.div`
	background-color: white;
`;

const Chat = () => {
	const [socket, setSocket] = useState(socketio("http://localhost:80"));

	const [chat, setChat] = useState({ nickname: "", message: "" });

	useEffect(() => {
		sockets();
	}, []);

	const sockets = () => {
		socket.emit("online", "이야호");

		socket.on("online", (message) => {
			console.log(message);
		});
	};

	const send = (e) => {
		console.log(chat);
	};

	const inputChange = (e) => {
		setChat({ [e.target.name]: e.target.value });
	};

	return (
		<ChatDiv>
			<h1>채팅방</h1>
			이름:
			<input
				type="text"
				name="nickname"
				onChange={(e) => inputChange(e)}
			></input>
			<br />
			메세지:
			<input
				type="text"
				name="message"
				onChange={(e) => inputChange(e)}
			></input>
			<br />
			<button onClick={(e) => send(e)}>전송</button>
		</ChatDiv>
	);
};

export default Chat;
