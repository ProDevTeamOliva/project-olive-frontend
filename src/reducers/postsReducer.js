import {
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
} from "../types/commentTypes";
import {
    ADD_POST_SUCCESS,
    DISLIKE_SUCCESS,
    GET_MORE_POSTS_FAILURE,
    GET_MORE_POSTS_REQUEST,
    GET_MORE_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    LIKE_SUCCESS,
    DELETE_POST_SUCCESS,
} from "../types/postTypes";

const init_state = {
    posts: [],
    isMorePosts: false,
    isFetching: false,
    isFetched: false,
    isFetchingError: false,
};

const postsReducer = (state = init_state, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingError: true,
                isFetched: false,
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts,
                isMorePosts: action.payload.posts?.length >= 15,
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
            };
        case GET_MORE_POSTS_FAILURE:
            return {
                ...state,
                isFetchingError: true,
                isFetched: false,
                isFetching: false,
            };
        case GET_MORE_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetched: false,
                isFetchingError: false,
            };
        case GET_MORE_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                isMorePosts: action.payload.posts?.length >= 15,
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
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [
                    { ...action.payload.post, likes: 0, likesMe: false },
                    ...state.posts,
                ],
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(
                    post => post.id !== action.payload.idPost
                ),
                isFetching: false,
                isFetched: true,
                isFetchingError: false,
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
export default postsReducer;
