import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';

interface StateProps {

}

class DispatchProps {

}

export class ContactPageComponent extends Component<StateProps & DispatchProps, any>
{
	componentDidMount() {
		document.title = "Contact | React Typescript Boilerplate";
	}

	render() {
		return (
			<div className="ContactPage">
				<div className="better better-coloured">
					<div className="better-title">Contact Page</div>
					<p className='description'>Welcome to Contact Page</p>
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

let ContactPage = connect(connectStateToProps, connectDispatchToProps)(ContactPageComponent);
export default ContactPage;