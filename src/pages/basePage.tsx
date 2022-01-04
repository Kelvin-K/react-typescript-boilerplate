import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import Footer from '../components/footer';
import Header from '../components/header';
import Loading from '../components/Loading';
import IAppState from '../interfaces/IAppState';
import RouteConstants from './../constants/routeConstants';
const ContactPage = React.lazy(() => import('./contactPage'));
const HomePage = React.lazy(() => import('./homePage'));
const SignUpPage = React.lazy(() => import('./signUpPage'));
const CheckListPage = React.lazy(() => import('./checkListPage'));
const LoginPage = React.lazy(() => import('./loginPage'));

interface StateProps {

}

class DispatchProps {

}

export class BasePageComponent extends Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<div className="BasePage">
				<Header />
				<Switch>
					<Route path={RouteConstants.loginRoute}>
						<React.Suspense fallback={<Loading />}>
							<LoginPage />
						</React.Suspense>
					</Route>
					<Route path={RouteConstants.checkListRoute}>
						<React.Suspense fallback={<Loading />}>
							<CheckListPage />
						</React.Suspense>
					</Route>
					<Route path={RouteConstants.contactRoute}>
						<React.Suspense fallback={<Loading />}>
							<ContactPage />
						</React.Suspense>
					</Route>
					<Route path={RouteConstants.signUpRoute}>
						<React.Suspense fallback={<Loading />}>
							<SignUpPage />
						</React.Suspense>
					</Route>
					<Route path={RouteConstants.homeRoute}>
						<React.Suspense fallback={<Loading />}>
							<HomePage />
						</React.Suspense>
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