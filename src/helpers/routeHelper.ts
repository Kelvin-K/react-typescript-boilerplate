import RouteConstants from "../constants/routeConstants";

class RouteHelper {
	static authenticatedRoutes = (): string[] => {
		return [
			RouteConstants.checkListRoute
		];
	}

	static unAuthenticatedRoutes = (): string[] => {
		return [
			RouteConstants.loginRoute,
			RouteConstants.signUpRoute
		];
	}

	static commonRoutes = (): string[] => {
		return [
			RouteConstants.homeRoute,
			RouteConstants.contactRoute
		];
	}

	static validRoutes = (): string[] => {
		return [
			RouteConstants.homeRoute,
			RouteConstants.contactRoute,
			RouteConstants.checkListRoute,
			RouteConstants.loginRoute,
			RouteConstants.signUpRoute
		];
	}

	static getSearchParameters = (routerSearch: string): { [property: string]: string } => {
		let params: { [property: string]: string } = {};
		routerSearch.substring(1).split("&").forEach(param => {
			const [k, v] = param.split("=");
			if (k && v)
				params[k] = decodeURIComponent(v);
		});
		return params;
	}

	static getQueryString = (params: { [property: string]: string }): string => {
		let queries: string[] = [];
		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key];
				queries.push(`${key}=${encodeURIComponent(value)}`);
			}
		}
		return `?${queries.join("&")}`;
	}
}

export default RouteHelper;