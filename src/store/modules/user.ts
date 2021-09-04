import { Reducer } from "redux";
import StoreConstants from "../../constants/storeConstants";

export class UserState {
	public firstName: string = "";
	public lastName: string = "";
	public isAuthenticated: boolean = false;
	public isAuthenticationStatusChecked: boolean = false;
}

export type UserAction =
	{ type: typeof StoreConstants.LOGOUT } |
	{ type: typeof StoreConstants.AUTHENTICATED, firstName: string, lastName: string } |
	{ type: typeof StoreConstants.AUTHENTICATION_STATUS_CHECKED, isAuthenticated: boolean, firstName: string, lastName: string }

export const UserReducer: Reducer<UserState, UserAction> = (state: UserState = new UserState(), action: UserAction) => {
	switch (action.type) {
		case StoreConstants.AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true,
				firstName: action.firstName,
				lastName: action.lastName
			};
		case StoreConstants.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				firstName: "",
				lastName: ""
			};
		case StoreConstants.AUTHENTICATION_STATUS_CHECKED:
			return {
				...state,
				isAuthenticationStatusChecked: true,
				isAuthenticated: action.isAuthenticated,
				firstName: action.firstName,
				lastName: action.lastName
			};
		default:
			return state;
	}
};
