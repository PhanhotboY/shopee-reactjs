import actionTypes from '../actions/actionTypes';

const initialState = {
    isAdmin: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_USER_FAIL:
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
