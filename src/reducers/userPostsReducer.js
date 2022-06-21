import {
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
} from "../types/commentTypes";
import { DISLIKE_SUCCESS, LIKE_SUCCESS } from "../types/postTypes";
import {
    USER_POSTS_SUCCESS,
    USER_POSTS_FAILURE,
    USER_MORE_POSTS_REQUEST,
    USER_MORE_POSTS_SUCCESS,
    USER_MORE_POSTS_FAILURE,
    USER_POSTS_REQUEST,
} from "../types/userTypes";

const init_state = {
    posts: [],
    message: "",
    isMorePosts: false,
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const userPostsReducer = (state = init_state, action) => {
    switch (action.type) {
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.comment.postId) {
                        return {
                            ...post,
                            comments: post.comments + 1,
                        };
                    }
                    return post;
                }),
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.idPost) {
                        return {
                            ...post,
                            comments: post.comments - 1,
                        };
                    }
                    return post;
                }),
            };
        case USER_POSTS_SUCCESS:
            return {
                posts: [...action.payload.posts],
                message: action.payload.message,
                isMorePosts: action.payload.posts?.length >= 15,
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
            };
        case USER_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case USER_POSTS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                isFetching: false,
                isFetchingError: true,
                isFetched: false,
            };
        case USER_MORE_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetchingError: false,
                isFetched: false,
                isMorePosts: true,
            };
        case USER_MORE_POSTS_SUCCESS:
            return {
                posts: [...state.posts, ...action.payload.posts],
                message: action.payload.message,
                isMorePosts: action.payload.posts?.length >= 15,
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
            };
        case USER_MORE_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingError: true,
                isFetched: false,
            };

        case LIKE_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            likes: post.likes + 1,
                            likesMe: true,
                        };
                    }
                    return post;
                }),
            };
        case DISLIKE_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.id) {
                        return {
                            ...post,
                            likes: post.likes - 1,
                            likesMe: false,
                        };
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};

export default userPostsReducer;
