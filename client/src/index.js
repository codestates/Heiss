import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./components/utils/theme";
import { ThemeProvider } from "styled-components";
// import ReviewModal from "./components/ReviewModal";
// import Review from "./page/Review";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
