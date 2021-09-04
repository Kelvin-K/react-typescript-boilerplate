import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';

interface StateProps {

}

class DispatchProps {

}

export class FooterComponent extends React.Component<StateProps & DispatchProps, any>
{
	render() {
		return (
			<div className="footer">
				footer
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

let Footer = connect(connectStateToProps, connectDispatchToProps)(FooterComponent);
export default Footer;