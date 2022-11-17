import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userUpdateSuccess = (userInfo) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    userInfo: userInfo,
});

export const processLogout = () => {
    return async (dispatch, getState) => {
        dispatch(userLogoutSuccess());
    };
};

export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const userAuthenticate = () => ({
    type: actionTypes.USER_AUTHENTICATE,
});
