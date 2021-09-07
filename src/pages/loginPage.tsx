import { StatusCodes } from "http-status-codes";
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';
import StoreConstants from './../constants/storeConstants';
interface StateProps {

}

class DispatchProps {
	login = (firstName: string, lastName: string) => {
		return { type: StoreConstants.AUTHENTICATED, firstName: firstName, lastName: lastName };
	}
}

export class LoginPageComponent extends React.Component<StateProps & DispatchProps, any>
{
	userName = React.createRef<HTMLInputElement>();
	password = React.createRef<HTMLInputElement>();

	userNameError = React.createRef<HTMLDivElement>();
	passwordError = React.createRef<HTMLDivElement>();

	componentDidMount() {
		document.title = "Login | React Typescript Boilerplate";
	}

	validateAndLogin = () => {
		let userName = this.userName.current.value;
		let password = this.password.current.value;
		let valid = true;

		if (!userName) {
			this.userNameError.current.innerText = "Username can not be empty!";
			valid = false;
		}
		else
			this.userNameError.current.innerText = "";

		if (!password) {
			this.passwordError.current.innerText = "Password can not be empty!";
			valid = false;
		}
		else
			this.passwordError.current.innerText = "";

		if (valid)
			this.login(userName, password);
	}

	login = async (userName: string, password: string) => {
		let response = await fetch("/api/authentication", {
			method: "POST",
			body: JSON.stringify({
				userName,
				password
			}),
			headers: {
				"content-type": "application/json"
			}
		});
		switch (response.status) {
			case StatusCodes.NOT_FOUND:
				this.userNameError.current.innerText = "User not found!";
				break;
			case StatusCodes.UNAUTHORIZED:
				this.passwordError.current.innerText = "Invalid credentials!";
				break;
			case StatusCodes.OK:
				let body = await response.json();
				this.props.login(body.firstName, body.lastName);
				break;
		}
	}

	render() {
		return (
			<div className="LoginPage">
				<div className="better">
					<div className="better-form">
						<h1 className="form-title">Login</h1>
						<div className="input-section">
							<label htmlFor="UserName" className="input-title">Username: </label>
							<div className="input-holder">
								<input type="text" id="UserName" name="UserName" ref={this.userName} />
							</div>
							<div className="error-msg" ref={this.userNameError} />
						</div>
						<div className="input-section">
							<label htmlFor="Password" className="input-title">Password: </label>
							<div className="input-holder">
								<input type="Password" id="Password" name="Password" ref={this.password} />
							</div>
							<div className="error-msg" ref={this.passwordError} />
						</div>
						<div className="input-section">
							<div className="input-holder">
								<button onClick={this.validateAndLogin}>Login</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function connectStateToProps(state: IAppState, ownProps: any): StateProps {
	return {
		...ownProps,
	};
}

function connectDispatchToProps(dispatch: any): DispatchProps {
	return bindActionCreators({ ...new DispatchProps() }, dispatch);
}

let LoginPage = connect(connectStateToProps, connectDispatchToProps)(LoginPageComponent);
export default LoginPage;