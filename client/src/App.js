import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Mainpage from "./page/Mainpage";

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
		background-color: #343421;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	input {
		background-color: rgba(0, 0, 0, 0);
		color: #38d9a9;
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

function App() {
	return (
		<Router>
			<GlobalStyles />
			<Switch>
				<Route exact path="/">
					<Mainpage />
				</Route>
				<Route path="/review">{/* <Review /> */}</Route>
				<Route path="/login">{/* <Signin /> */}</Route>
				<Route path="/signup">{/* <Signup /> */}</Route>
				<Route path="/make">{/* <Signup /> */}</Route>
			</Switch>
		</Router>
	);
}

export default App;
