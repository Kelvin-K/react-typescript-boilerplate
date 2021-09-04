import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import Footer from '../components/footer';
import Header from '../components/header';
import IAppState from '../interfaces/IAppState';
import RouteConstants from './../constants/routeConstants';
import CheckListPage from './checkListPage';
import ContactPage from './contactPage';
import HomePage from './homePage';
import LoginPage from './loginPage';

interface StateProps {

}

class DispatchProps {

}

export class BasePageComponent extends React.Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<div className="BasePage">
				<Header />
				<Switch>
					<Route path={RouteConstants.loginRoute}>
						<LoginPage />
					</Route>
					<Route path={RouteConstants.checkListRoute}>
						<CheckListPage />
					</Route>
					<Route path={RouteConstants.contactRoute}>
						<ContactPage />
					</Route>
					<Route path={RouteConstants.homeRoute}>
						<HomePage />
					</Route>
				</Switch>
				<Footer />
			</div>
		);
	}
}

function connectStateToProps(state: IAppState): StateProps {
	return {

	};
}

function connectDispatchToProps(dispatch: any): DispatchProps {
	return bindActionCreators({ ...new DispatchProps() }, dispatch);
}

let BasePage = connect(connectStateToProps, connectDispatchToProps)(BasePageComponent);
export default BasePage