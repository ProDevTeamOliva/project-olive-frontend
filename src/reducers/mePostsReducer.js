import { ME_POSTS_SUCCESS, ME_POSTS_FAILURE } from "../types/meTypes";
import { ADD_POST_SUCCESS, DELETE_POST_SUCCESS } from "../types/postTypes";

const init_state = {
  posts: [],
  message: "",
};

const mePostsReducer = (state = init_state, action) => {
  switch (action.type) {
    case ME_POSTS_SUCCESS:
      return {
        posts: [...action.payload.posts],
        message: action.payload.message,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [{ ...action.payload.post, likes: [] }, ...state.posts],
      };
    case ME_POSTS_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    case DELETE_POST_SUCCESS:
      return {
        posts: state.posts.filter((post) => post.id !== action.payload.idPost),
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default mePostsReducer;
