import { StatusCodes } from 'http-status-codes';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';
import RouteConstants from './../constants/routeConstants';

interface StateProps extends RouteComponentProps {

}

class DispatchProps {

}

export class SignUpPageComponent extends React.Component<StateProps & DispatchProps, any>
{
	userName = React.createRef<HTMLInputElement>();
	password = React.createRef<HTMLInputElement>();
	confirmPassword = React.createRef<HTMLInputElement>();
	firstName = React.createRef<HTMLInputElement>();
	lastName = React.createRef<HTMLInputElement>();

	userNameError = React.createRef<HTMLDivElement>();
	passwordError = React.createRef<HTMLDivElement>();
	confirmPasswordError = React.createRef<HTMLDivElement>();
	firstNameError = React.createRef<HTMLInputElement>();
	lastNameError = React.createRef<HTMLInputElement>();

	commonMessage = React.createRef<HTMLInputElement>();

	validateAndSignUp = () => {
		let userName = this.userName.current.value;
		let password = this.password.current.value;
		let confirmPassword = this.confirmPassword.current.value;
		let firstName = this.firstName.current.value;
		let lastName = this.lastName.current.value;
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
		else if (!confirmPassword) {
			this.confirmPasswordError.current.innerText = "Confirm password can not be empty!";
			valid = false;
		}
		else if (password !== confirmPassword) {
			this.confirmPasswordError.current.innerText = "Confirm password must match password!";
			valid = false;
		}
		else {
			this.passwordError.current.innerText = "";
			this.confirmPasswordError.current.innerText = "";
		}

		if (!firstName) {
			this.firstNameError.current.innerText = "First name can not be empty!";
			valid = false;
		}
		else
			this.firstNameError.current.innerText = "";

		if (!lastName) {
			this.lastNameError.current.innerText = "Last name can not be empty!";
			valid = false;
		}
		else
			this.lastNameError.current.innerText = "";

		if (valid)
			this.signUp({
				userName,
				password,
				firstName,
				lastName
			});
	}

	signUp = async (data: any) => {
		let response = await fetch("/api/authentication/signup", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"content-type": "application/json"
			}
		});

		switch (response.status) {
			case StatusCodes.BAD_REQUEST:
				let body = await response.json();
				switch (body.errorType) {
					case "validationError":
						let errors = body.message;
						for (const key in errors) {
							if (Object.prototype.hasOwnProperty.call(errors, key)) {
								const error = errors[key];
								(this as any)[key + 'Error'].current.innerText = error;
							}
						}
						break;
					case "userNameError":
						this.userNameError.current.innerText = body.message;
						break;
				}
				break;
			case StatusCodes.OK:
				this.commonMessage.current.innerText = "Sign Up Successful!\nPlease wait while we redirect you to login page";
				setTimeout(() => {
					const { history } = this.props;
					history.push(RouteConstants.loginRoute);
				}, 2000);
				break;
		}
	}

	render() {
		return (
			<div className="SignUpPage">
				<div className="better">
					<div className="better-form">
						<h1 className="form-title">Sign Up</h1>
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
							<label htmlFor="ConfirmPassword" className="input-title">Confirm Password: </label>
							<div className="input-holder">
								<input type="Password" id="ConfirmPassword" name="ConfirmPassword" ref={this.confirmPassword} />
							</div>
							<div className="error-msg" ref={this.confirmPasswordError} />
						</div>
						<div className="input-section">
							<label htmlFor="LastName" className="input-title">Last Name: </label>
							<div className="input-holder">
								<input type="text" id="LastName" name="LastName" ref={this.lastName} />
							</div>
							<div className="error-msg" ref={this.lastNameError} />
						</div>
						<div className="input-section">
							<label htmlFor="FirstName" className="input-title">First Name: </label>
							<div className="input-holder">
								<input type="text" id="FirstName" name="FirstName" ref={this.firstName} />
							</div>
							<div className="error-msg" ref={this.firstNameError} />
						</div>
						<div className="input-section">
							<div className="input-holder">
								<button onClick={this.validateAndSignUp}>Sign Up</button>
							</div>
						</div>
						<div className="common-msg" ref={this.commonMessage} />
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

let SignUpPage = connect(connectStateToProps, connectDispatchToProps)(SignUpPageComponent);
export default withRouter(SignUpPage);