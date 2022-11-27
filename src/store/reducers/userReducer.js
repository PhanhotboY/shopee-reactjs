import { ROLES } from 'utils';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isAdmin: false,
    notifications: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                isAdmin: action.userInfo.roleId === ROLES.ADMIN,
            };
        case actionTypes.USER_AUTHENTICATE:
            return {
                ...state,
                isAdmin: action.userInfo ? action.user.userInfo === ROLES.ADMIN : false,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                userInfo: null,
                notifications: [],
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                userInfo: null,
                notifications: [],
            };
        case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.notifications,
            };
        case actionTypes.FETCH_NOTIFICATIONS_FAIL:
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isAdmin: action.userInfo.roleId === ROLES.ADMIN,
                userInfo: action.userInfo,
            };
        default:
            return state;
    }
};

export default userReducer;
