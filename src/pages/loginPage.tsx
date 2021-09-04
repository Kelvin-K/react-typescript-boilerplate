import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';
import StoreConstants from './../constants/storeConstants';

interface StateProps {

}

class DispatchProps {
	login = () => {
		return { type: StoreConstants.AUTHENTICATED }
	}
}

export class LoginPageComponent extends React.Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<div className="LoginPage">
				<div className="better">
					<div className="better-form">
						<h1 className="form-title">Login</h1>
						<div className="input-section">
							<label htmlFor="UserName" className="input-title">Username: </label>
							<div className="input-holder">
								<input type="text" id="UserName" name="UserName" />
							</div>
						</div>
						<div className="input-section">
							<label htmlFor="Password" className="input-title">Password: </label>
							<div className="input-holder">
								<input type="Password" id="Password" name="Password" />
							</div>
						</div>
						<div className="input-section">
							<div className="input-holder">
								<button onClick={this.props.login}>Login</button>
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