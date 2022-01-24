import { TAGS_SUCCESS, TAGS_FAILURE } from "../types/postTypes";

const init_state = [];

const postsFiltered = (state = init_state, action) => {
  switch (action.type) {
    case TAGS_SUCCESS:
      return action.payload.posts;

    case TAGS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default postsFiltered;
