import {
    ME_FRIENDS_SUCCESS,
    ME_FRIENDS_FAILURE,
    ME_ACCEPT_INVITATION_SUCCESS,
    ME_ACCEPT_INVITATION_FAILURE,
    ME_FRIENDS_REQUEST,
} from "../types/meTypes";

const init_state = {
    friends: [],
    pendingSent: [],
    pendingReceived: [],
    message: "",
    isMorePosts: false,
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const meFriendsReducer = (state = init_state, action) => {
    switch (action.type) {
        case ME_FRIENDS_SUCCESS:
            return {
                friends: [...action.payload.friends],
                pendingSent: [...action.payload.pendingSent],
                pendingReceived: [...action.payload.pendingReceived],
                message: action.payload.message,
            };
        case ME_FRIENDS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };

        case ME_FRIENDS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        case ME_ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
            };
        case ME_ACCEPT_INVITATION_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state;
    }
};
export default meFriendsReducer;
