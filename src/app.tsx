import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthenticationFilter from "./filters/authenticationFilter";
import BasePage from "./pages/basePage";
import store from "./store/store";

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Provider store={store}>
					<AuthenticationFilter>
						<BasePage />
					</AuthenticationFilter>
				</Provider>
			</BrowserRouter>
		);
	}
}
