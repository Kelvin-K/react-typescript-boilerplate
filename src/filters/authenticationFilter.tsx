import { StatusCodes } from 'http-status-codes';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loading from '../components/Loading';
import RouteConstants from '../constants/routeConstants';
import RouteHelper from '../helpers/routeHelper';
import IAppState from '../interfaces/IAppState';
import StoreConstants from './../constants/storeConstants';

interface StateProps extends RouteComponentProps {
	isAuthenticated: boolean;
	isAuthenticationStatusChecked: boolean;
}

class DispatchProps {
	authenticationStatusChecked = (isAuthenticated: boolean, firstName: string, lastName: string) => {
		return { type: StoreConstants.AUTHENTICATION_STATUS_CHECKED, isAuthenticated, firstName, lastName };
	}
}

export class AuthenticationFilterComponent extends React.Component<StateProps & DispatchProps, any>
{
	async componentDidMount() {
		if (!this.props.isAuthenticationStatusChecked) {
			let response = await fetch("/api/authentication/status");
			switch (response.status) {
				case StatusCodes.UNAUTHORIZED:
					this.props.authenticationStatusChecked(false, "", "");
					break;
				case StatusCodes.OK:
					let body = await response.json();
					this.props.authenticationStatusChecked(true, body.firstName, body.lastName);
					break;
			}
		}
	}

	render() {
		if (!this.props.isAuthenticationStatusChecked)
			return <Loading />;

		const { location } = this.props;

		if (RouteHelper.commonRoutes().includes(location.pathname))
			return this.props.children;

		if (!this.props.isAuthenticated && RouteHelper.authenticatedRoutes().includes(location.pathname))
			return <Redirect to={`${RouteConstants.loginRoute}${RouteHelper.getQueryString({ originalUrl: `${location.pathname}${location.search}` })}`} />

		if (this.props.isAuthenticated && RouteHelper.unAuthenticatedRoutes().includes(location.pathname)) {
			let params = RouteHelper.getSearchParameters(location.search);
			return <Redirect to={params["originalUrl"] || RouteConstants.postLoginDefaultRedirectRoute} />;
		}

		return this.props.children;
	}
}

function connectStateToProps(state: IAppState, ownProps: any): StateProps {
	return {
		...ownProps,
		isAuthenticated: state.user.isAuthenticated,
		isAuthenticationStatusChecked: state.user.isAuthenticationStatusChecked,
	};
}

function connectDispatchToProps(dispatch: any): DispatchProps {
	return bindActionCreators({ ...new DispatchProps() }, dispatch);
}

let AuthenticationFilter = connect(connectStateToProps, connectDispatchToProps)(AuthenticationFilterComponent);
export default withRouter(AuthenticationFilter);