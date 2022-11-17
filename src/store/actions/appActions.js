import actionTypes from './actionTypes';
import { appService } from 'services';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE,
});

export const changeLanguage = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language,
});

export const fetchGendersStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await appService.handleGetAllcodes('gender');

            if (res && !res.errCode) dispatch(fetchGendersSuccess(res.payload));
            else dispatch(fetchGendersFail());
        } catch (err) {
            console.log(err);
            dispatch(fetchGendersFail());
        }
    };
};

export const fetchGendersSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDERS_SUCCESS,
    genders: genders,
});

export const fetchGendersFail = () => ({
    type: actionTypes.FETCH_GENDERS_FAIL,
});

export const fetchRolesStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await appService.handleGetAllcodes('role');

            if (res && !res.errCode) dispatch(fetchRolesSuccess(res.payload));
            else dispatch(fetchRolesFail());
        } catch (err) {
            console.log(err);
            dispatch(fetchRolesFail());
        }
    };
};

export const fetchRolesSuccess = (roles) => ({
    type: actionTypes.FETCH_ROLES_SUCCESS,
    roles: roles,
});

export const fetchRolesFail = () => ({
    type: actionTypes.FETCH_ROLES_FAIL,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal,
});
