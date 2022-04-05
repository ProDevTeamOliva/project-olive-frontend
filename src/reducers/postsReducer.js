import {
  ADD_POST_SUCCESS,
  GET_POSTS_SUCCESS,
  LIKE_SUCCESS,
} from "../types/postTypes";

const init_state = [];

const postsReducer = (state = init_state, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return action.payload.posts;
    case LIKE_SUCCESS:
      return state;
    case ADD_POST_SUCCESS:
      return state;
    default:
      return state;
  }
};
export default postsReducer;
