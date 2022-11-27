import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: '',
    handleFunc: null,
    dataFunc: null,
};

const initialState = {
    started: false,
    language: 'vi',
    genders: [],
    roleIds: [],
    systemMenuPath: '/system/manage-user',
    userMenuPath: '/user/account/profile',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal,
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE:
            return {
                ...state,
                started: true,
            };
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        case actionTypes.FETCH_GENDERS_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDERS_SUCCESS:
            return {
                ...state,
                genders: action.genders,
            };
        case actionTypes.FETCH_GENDERS_FAIL:
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLES_SUCCESS:
            return {
                ...state,
                roleIds: action.roleIds,
            };
        case actionTypes.FETCH_ROLES_FAIL:
            return {
                ...state,
            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal,
                },
            };
        default:
            return state;
    }
};

export default appReducer;
