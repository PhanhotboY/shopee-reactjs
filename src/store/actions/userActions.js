import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userUpdateSuccess = (userInfo) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    userInfo: userInfo,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});
