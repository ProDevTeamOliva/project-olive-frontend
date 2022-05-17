import {
  TAGS_SUCCESS,
  TAGS_FAILURE,
  DELETE_POST_SUCCESS,
} from "../types/postTypes";

const init_state = [];

const postsFilteredByTag = (state = init_state, action) => {
  switch (action.type) {
    case TAGS_SUCCESS:
      return action.payload.posts;

    case TAGS_FAILURE:
      return state;
    case DELETE_POST_SUCCESS:
      return state.filter((post) => post.id !== action.payload.idPost);
    default:
      return state;
  }
};

export default postsFilteredByTag;
