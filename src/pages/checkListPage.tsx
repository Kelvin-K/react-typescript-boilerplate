import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IAppState from '../interfaces/IAppState';

interface StateProps {

}

class DispatchProps {

}

export class CheckListPageComponent extends React.Component<StateProps & DispatchProps, any>
{
	componentDidMount() {
		document.title = "Check List | React Typescript Boilerplate";
	}

	render() {
		return (
			<div className="CheckListPage">
				<div className="better better-title">Check List Page</div>
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

let CheckListPage = connect(connectStateToProps, connectDispatchToProps)(CheckListPageComponent);
export default CheckListPage;