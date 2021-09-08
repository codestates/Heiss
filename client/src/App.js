import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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
        @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
        font-family: "Noto Sans KR", sans-serif !important;
        background-color: #F5F5F3;
        /* background-color: black; */
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    input {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #38d9a9;
        color: #38d9a9;
        &::placeholder {
            color: #f5f5f3;
            font-weight: bold;
            font-size: 18px;
        }
    }
    button {
        border: 1px solid #38d9a9;
        background: none;
        cursor: pointer;
    }
`;

function App() {
	const getAccessToken = async (authorizationCode, platform) => {
		const url = process.env.REACT_APP_API_URL + "user/oauth";
		await axios
			.post(url, { authorizationCode: authorizationCode, platform: platform })
			.then((response) => console.log("oauth login response"));
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
					{/* <Mainpage /> */}
					<button onClick={kakaoclick}>kakao</button>
					<button onClick={naverclick}>naver</button>
				</Route>
				<Route exact path="/review">
					{/* <Review /> */}
				</Route>
				<Route exact path="/login">
					{/* <Signin /> */}
				</Route>
				<Route exact path="/signup">
					{/* <Signup /> */}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
