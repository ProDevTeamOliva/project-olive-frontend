import { USER_POSTS_SUCCESS, USER_POSTS_FAILURE } from "../types/userTypes";

const init_state = {
  posts: [],
  message: "",
};

const userPostsReducer = (state = init_state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default userPostsReducer;
