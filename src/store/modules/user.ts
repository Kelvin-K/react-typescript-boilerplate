import { Reducer } from "redux";
import StoreConstants from "../../constants/storeConstants";

export class UserState {
	public name: string = "Kelvin";
	public isAuthenticated: boolean = false;
	public isAuthenticationStatusChecked: boolean = false;
}

export type UserAction =
	{ type: typeof StoreConstants.xyz | typeof StoreConstants.AUTHENTICATED | typeof StoreConstants.LOGOUT | typeof StoreConstants.AUTHENTICATION_STATUS_CHECKED };

export const UserReducer: Reducer<UserState, UserAction> = (state: UserState = new UserState(), action: UserAction) => {
	switch (action.type) {
		case StoreConstants.AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true
			};
		case StoreConstants.LOGOUT:
			return {
				...state,
				isAuthenticated: false
			};
		case StoreConstants.AUTHENTICATION_STATUS_CHECKED:
			return {
				...state,
				isAuthenticationStatusChecked: true
			};
		default:
			return state;
	}
};
