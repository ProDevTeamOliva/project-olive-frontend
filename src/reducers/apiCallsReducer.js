import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    GET_MORE_POSTS_SUCCESS,
} from "../types/postTypes";

const init_state = {
    isLoadingPosts: true,
    isErrorPosts: false,
    isMorePosts: true,
};

const apiCallsReducer = (state = init_state, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return { ...state, isLoadingPosts: true, isErrorPosts: false };
        case GET_MORE_POSTS_SUCCESS:
            return {
                ...state,
                isMorePosts: action.payload.posts?.length >= 15,
            };
        case ADD_POST_FAILURE:
            return {
                isLoadingPosts: false,
                isErrorPosts: action.payload,
            };
        default:
            return state;
    }
};
export default apiCallsReducer;
