import React from "react";
import "./fonts/font.css";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/index";
import theme from "./components/utils/theme";
// import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
