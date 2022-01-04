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
				<div className="footer__left">No rights required</div>
				<div className="footer__right">
					<div className="footer__link"><a href="https://www.google.com/" target="_black">Google</a></div>
					<div className="footer__link"><a href="https://www.facebook.com/" target="_black">Facebook</a></div>
					<div className="footer__link"><a href="https://twitter.com/" target="_black">Twitter</a></div>
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

let Footer = connect(connectStateToProps, connectDispatchToProps)(FooterComponent);
export default Footer;