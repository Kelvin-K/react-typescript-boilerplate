import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import RouteConstants from '../constants/routeConstants';
import IAppState from '../interfaces/IAppState';
import StoreConstants from './../constants/storeConstants';

interface StateProps {
	isAuthenticated: boolean;
}

class DispatchProps {
	logout = () => {
		return { type: StoreConstants.LOGOUT };
	}
}

export class HeaderComponent extends React.Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<header className="header">
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
									<div className="menu-item" onClick={this.props.logout}>Logout</div>
								</> :
								<Link className="menu-item" to={RouteConstants.loginRoute}>Login</Link>
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
		isAuthenticated: state.user.isAuthenticated
	};
}

function connectDispatchToProps(dispatch: any): DispatchProps {
	return bindActionCreators({ ...new DispatchProps() }, dispatch);
}

let Header = connect(connectStateToProps, connectDispatchToProps)(HeaderComponent);
export default Header