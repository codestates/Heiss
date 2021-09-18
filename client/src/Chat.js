import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const ChatDiv = styled.div`
	background-color: white;
`;

const Chat = () => {
	const socket = io.connect(process.env.REACT_APP_API_URL);

	const [state, setState] = useState("");
	const [chat, setChat] = useState([]);

	useEffect(() => {
		socket.on("message", (data) => {
			setChat([...chat, data]);
		});
	});

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	// const onMessageSubmit = (e) => {
	// 	e.preventDefault();
	// 	const { name, message } = state;
	// 	socket.emit("message", { name, message });
	// 	setState({ message: "", name });
	// };

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}:<span>{message}</span>
				</h3>
			</div>
		));
	};

	return (
		<ChatDiv>
			<p>으어아아아ㅏ아아아앙</p>
		</ChatDiv>

		// <div>
		// 	<form onSubmit={onMessageSubmit}>
		// 		<h1>Message</h1>
		// 		<div className="name-field">
		// 			<input
		// 				name="name"
		// 				onChange={(e) => onTextChange(e)}
		// 				value={state.name}
		// 				label="Name"
		// 			/>
		// 		</div>
		// 		<div>
		// 			<input
		// 				name="message"
		// 				onChange={(e) => onTextChange(e)}
		// 				value={state.message}
		// 				id="outlined-multiline-static"
		// 				variant="outlined"
		// 				label="Message"
		// 			/>
		// 		</div>
		// 		<button>Send Message</button>
		// 	</form>
		// 	<div>
		// 		<h1>Chat log</h1>
		// 		{renderChat()}
		// 	</div>
		// </div>
	);
};

export default Chat;
