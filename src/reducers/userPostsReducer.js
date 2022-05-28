import {
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
} from "../types/commentTypes";
import { DISLIKE_SUCCESS, LIKE_SUCCESS } from "../types/postTypes";
import { USER_POSTS_SUCCESS, USER_POSTS_FAILURE } from "../types/userTypes";

const init_state = {
    posts: [],
    message: "",
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
            };
        case USER_POSTS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
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
