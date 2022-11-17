import { toast } from 'react-toastify';
import { userService } from 'services';
import actionTypes from './actionTypes';

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.handleSignup(data);

            if (res && !res.errType) {
                dispatch(createUserSuccess());
                toast.success('Create new user successfully!');
            } else {
                dispatch(createUserFail());
                toast.error('Create user fail!');
            }
        } catch (err) {
            dispatch(createUserFail());
            toast.error('Create user fail!');
            console.log(err);
        }
    };
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
});
