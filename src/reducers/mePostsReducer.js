import {
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
} from "../types/commentTypes";
import {
    ME_POSTS_SUCCESS,
    ME_POSTS_FAILURE,
    ME_MORE_POSTS_REQUEST,
    ME_POSTS_REQUEST,
    ME_MORE_POSTS_FAILURE,
    ME_MORE_POSTS_SUCCESS,
} from "../types/meTypes";
import {
    ADD_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    DISLIKE_SUCCESS,
    LIKE_SUCCESS,
} from "../types/postTypes";

const init_state = {
    posts: [],
    message: "",
    isMorePosts: false,
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const mePostsReducer = (state = init_state, action) => {
    switch (action.type) {
        case ME_POSTS_SUCCESS:
            return {
                posts: [...action.payload.posts],
                message: action.payload.message,
                isMorePosts: action.payload.posts?.length > 0,
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
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
        case ME_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingError: true,
                isFetched: false,
            };
        case ME_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case ME_MORE_POSTS_SUCCESS:
            return {
                posts: [...state.posts, ...action.payload.posts],
                message: action.payload.message,
                isMorePosts: action.payload.posts?.length > 0,
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
            };
        case ME_MORE_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingError: true,
                isFetched: false,
            };
        case ME_MORE_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [{ ...action.payload.post, likes: 0 }, ...state.posts],
            };
        case DELETE_POST_SUCCESS:
            return {
                posts: state.posts.filter(
                    post => post.id !== action.payload.idPost
                ),
                message: action.payload.message,
            };
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
        default:
            return state;
    }
};

export default mePostsReducer;
