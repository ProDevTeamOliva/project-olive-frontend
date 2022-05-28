import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_RESTART,
    SEARCH_REQUEST,
} from "../types/searchTypes";

const init_state = {
    payload: [],
    message: "",
    loading: false,
};

const searchReducer = (state = init_state, action) => {
    switch (action.type) {
        case SEARCH_SUCCESS:
            return {
                payload: action.payload.payload,
                message: "",
                loading: false,
            };
        case SEARCH_FAILURE:
            return {
                payload: [],
                message: action.payload.message,
                loading: false,
            };
        case SEARCH_REQUEST:
            return {
                payload: [],
                message: "",
                loading: true,
            };
        case SEARCH_RESTART:
            return {
                payload: [],
                message: "",
                loading: false,
            };
        default:
            return state;
    }
};
export default searchReducer;
