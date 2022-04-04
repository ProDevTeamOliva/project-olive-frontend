import {
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_RESTART,
  SEARCH_REQUEST,
} from "../types/searchTypes";
const init_state = {
  users: [],
  message: "",
  loading: false,
};
const searchUsersReducer = (state = init_state, action) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return {
        users: action.payload.users,
        message: '',
        loading: false,
      };
    case SEARCH_FAILURE:
      return {
        users: [],
        message: action.payload.message,
        loading: false,
      };
    case SEARCH_REQUEST:
      return {
        users: [],
        message: '',
        loading: true,
      }
    case SEARCH_RESTART:
      return {
        users: [],
        message: "",
        loading: false,
      };
    default:
      return state;
  }
};
export default searchUsersReducer;
