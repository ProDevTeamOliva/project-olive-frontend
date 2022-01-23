import {
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_POST_REQUEST,
} from "../types/postTypes";
const init_state = {
  isLoadingPosts: true,
  isErrorPosts: false,
};
const apiCallsReducer = (state = init_state, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return {
        isLoadingPosts: false,
        isErrorPosts: false,
      };

    case ADD_POST_REQUEST:
      return {
        isLoadingPosts: true,
        isErrorPosts: false,
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
