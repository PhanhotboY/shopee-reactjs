import actionTypes from './actionTypes';
import { appService } from 'services';

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

export const fetchNotificationsStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await appService.handleGetNotifications(userId);

            if (res && !res.errCode) dispatch(fetchNotificationsSuccess(res.payload));
            else dispatch(fetchNotificationsFail());
        } catch (err) {
            console.log(err);
            dispatch(fetchNotificationsFail());
        }
    };
};

export const fetchNotificationsSuccess = (notifications) => ({
    type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
    notifications: notifications,
});

export const fetchNotificationsFail = () => ({
    type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
});

export const userAuthenticate = () => ({
    type: actionTypes.USER_AUTHENTICATE,
});
