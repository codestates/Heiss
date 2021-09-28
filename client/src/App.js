import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reviewDatas } from "./redux/modules/review";

import Mainpage from "./page/Mainpage";
import Makepage from "./page/Makepage";
import Mypage from "./page/Mypage";
import Review from "./page/Review";
import Chat from "./Chat";
import Pay from "./page/Pay";

const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		list-style: none;
		text-decoration: none;
	}

	body {
		font-family: "Noto Sans KR", sans-serif !important;
		/* background-color: #343421; */
		background-color: #171717;
		height: 100%;
		width: 100%;
		overflow: hidden;
		-ms-overflow-style: none;
	} 
	input {
		background-color: rgba(0, 0, 0, 0);
		border: 3px solid #f47676;
		color: #f47676;
		padding: 13px;
		&::placeholder {
			color: #f5f5f3;
			font-weight: bold;
			font-size: 18px;
		}
	}
	button {
		background: none;
		cursor: pointer;
	}
`;

const App = () => {
	let state = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(reviewDatas());
	}, []);

	const getAccessToken = async (authorizationCode, platform) => {
		const url = process.env.REACT_APP_API_URL + "user/oauth";
		await axios
			.post(
				url,
				{ authorizationCode: authorizationCode, platform: platform },
				{ "Content-Type": "application/json", withCredentials: true }
			)
			.then((response) => console.log(response));
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code"); //oauth redirection후에 code를 받아왔다면 실행
		if (authorizationCode) {
			const platform = url.searchParams.get("state");
			getAccessToken(authorizationCode, platform);
		}
	});

	function kakaoclick() {
		const kakaourl = "https://kauth.kakao.com/oauth/authorize";
		const client_id = process.env.REACT_APP_KAKAO_CLIENT;
		const redirect_uri = process.env.REACT_APP_CLIENT_REDIRECT;
		const response_type = "code";
		const state = "kakao";
		const url = `${kakaourl}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}`;
		window.location.assign(url);
	}

	function naverclick() {
		const naverurl = "https://nid.naver.com/oauth2.0/authorize";
		const client_id = process.env.REACT_APP_NAVER_CLIENT;
		const redirect_uri = process.env.REACT_APP_CLIENT_REDIRECT;
		const response_type = "code";
		const state = "naver";
		const url = `${naverurl}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}`;
		window.location.assign(url);
	}

	return (
		<Router>
			<GlobalStyles />
			<Switch>
				<Route exact path="/">
					<Mainpage />
				</Route>
				<Route path="/review">
					<Review />
				</Route>
				<Route path="/make">
					<Makepage />
				</Route>
				<Route path="/mypage">
					<Mypage />
				</Route>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route path="/pay">
					<Pay />
				</Route>
				<button onClick={kakaoclick}>kakao</button>
				<button onClick={naverclick}>naver</button>
			</Switch>
		</Router>
	);
};

export default App;
