import {
    USER_PICTURES_SUCCESS,
    USER_PICTURES_FAILURE,
    USER_PICTURES_REQUEST,
} from "../types/userTypes";

const init_state = {
    pictures: [],
    message: "",
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const userPicturesReducer = (state = init_state, action) => {
    switch (action.type) {
        case USER_PICTURES_SUCCESS:
            return {
                pictures: [...action.payload.pictures],
                message: action.payload.message,
            };
        case USER_PICTURES_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case USER_PICTURES_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state;
    }
};

export default userPicturesReducer;
