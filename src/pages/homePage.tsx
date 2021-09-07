import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';

interface StateProps {

}

class DispatchProps {

}

export class HomePageComponent extends React.Component<StateProps & DispatchProps, any>
{
	componentDidMount() {
		document.title = "Home | React Typescript Boilerplate";
	}

	render() {
		return (
			<div className="HomePage">
				<div className="better better-title">Home Page</div>
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

let HomePage = connect(connectStateToProps, connectDispatchToProps)(HomePageComponent);
export default HomePage;