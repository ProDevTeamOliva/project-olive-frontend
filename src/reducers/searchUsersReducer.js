import {
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_RESTART,
} from "../types/searchTypes";
const init_state = {
  users: [],
  message: "",
};
const searchUsersReducer = (state = init_state, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        users: action.payload.users,
        message: action.payload.message,
      };
    case SEARCH_FAILURE:
      return {
        users: [],
        message: action.payload.message,
      };
    case SEARCH_RESTART:
      return {
        users: [],
        message: "",
      };
    default:
      return state;
  }
};
export default searchUsersReducer;
