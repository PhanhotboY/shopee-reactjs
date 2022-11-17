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
    redirectPath: '/',
    allowRedirectBack: false,
});

export const userAlreadyHaveAccount = connectedRouterRedirect({
    // Want to redirect the user when they are already have an account
    authenticatedSelector: (state) => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserAlreadyHaveAccount',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
});

export const userIsAnAdminRedir = connectedReduxRedirect({
    redirectAction: replace,
    authenticatedSelector: (state) => state.user.userInfo && state.user.isAdmin,
    authenticatingSelector: (state) => !state.app.started,
    redirectPath: '/',
    allowRedirectBack: false,
    wrapperDisplayName: 'UserIsAnAdminRedir',
});
