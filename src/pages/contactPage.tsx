import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';

interface StateProps {

}

class DispatchProps {

}

export class ContactPageComponent extends React.Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<div className="ContactPage">
				<div className="better better-title">Contact Page</div>
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

let ContactPage = connect(connectStateToProps, connectDispatchToProps)(ContactPageComponent);
export default ContactPage;