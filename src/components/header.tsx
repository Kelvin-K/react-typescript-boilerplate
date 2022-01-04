import { StatusCodes } from 'http-status-codes';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import RouteConstants from '../constants/routeConstants';
import IAppState from '../interfaces/IAppState';
import StoreConstants from './../constants/storeConstants';

interface StateProps {
	isAuthenticated: boolean;
	firstName: string;
	lastName: string;
}

class DispatchProps {
	logout = () => {
		return { type: StoreConstants.LOGOUT };
	}
}

export class HeaderComponent extends Component<StateProps & DispatchProps, any>
{
	logout = async () => {
		let response = await fetch("/api/authentication/logout", {
			method: "POST"
		});

		if (response.status === StatusCodes.OK)
			this.props.logout();
	}

	render() {
		return (
			<header>
				<div className="header-content">
					<div className="left-part">
						LOGO
					</div>
					<div className="right-part">
						<Link className="menu-item" to={RouteConstants.homeRoute}>Home</Link>
						<Link className="menu-item" to={RouteConstants.contactRoute}>Contact</Link>
						{
							this.props.isAuthenticated ?
								<>
									<Link className="menu-item" to={RouteConstants.checkListRoute}>Check List</Link>
									<div className="menu-item" onClick={this.logout}>Logout {this.props.firstName + " " + this.props.lastName}</div>
								</> :
								<>
									<Link className="menu-item" to={RouteConstants.loginRoute}>Login</Link>
									<Link className="menu-item" to={RouteConstants.signUpRoute}>SignUp</Link>
								</>
						}
					</div>
				</div>
			</header>
		);
	}
}

function connectStateToProps(state: IAppState, ownProps: any): StateProps {
	return {
		...ownProps,
		isAuthenticated: state.user.isAuthenticated,
		firstName: state.user.firstName,
		lastName: state.user.lastName
	};
}

function connectDispatchToProps(dispatch: any): DispatchProps {
	return bindActionCreators({ ...new DispatchProps() }, dispatch);
}

let Header = connect(connectStateToProps, connectDispatchToProps)(HeaderComponent);
export default Header;