import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {
    connectedRouterRedirect,
    connectedReduxRedirect,
} from 'redux-auth-wrapper/history4/redirect';
import { replace } from 'connected-react-router';

const locationHelper = locationHelperBuilder({});

export const userIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: (state) => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
});

export const userIsAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are not authenticated
    authenticatedSelector: (state) => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login',
});

export const userIsAnAdmin = connectedReduxRedirect({
    // Want to redirect the user when they are an admin
    redirectAction: replace,
    authenticatedSelector: (state) => state.user.userInfo && state.user.isAdmin,
    authenticatingSelector: (state) => !state.app.started,
    redirectPath: (state) => (state.user.isLoggedIn ? '/' : '/login'),
    wrapperDisplayName: 'UserIsAnAdmin',
    allowRedirectBack: (nextState, redirectPath) => redirectPath !== '/',
});
