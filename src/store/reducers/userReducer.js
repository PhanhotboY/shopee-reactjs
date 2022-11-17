import { ROLE } from 'utils';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isAdmin: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                isAdmin: action.userInfo.roleId === ROLE.ADMIN,
            };
        case actionTypes.USER_AUTHENTICATE:
            return {
                ...state,
                isAdmin: action.userInfo ? action.user.userInfo === ROLE.ADMIN : false,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                userInfo: null,
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                userInfo: null,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                isAdmin: action.userInfo.roleId === ROLE.ADMIN,
                userInfo: action.userInfo,
            };
        default:
            return state;
    }
};

export default userReducer;
