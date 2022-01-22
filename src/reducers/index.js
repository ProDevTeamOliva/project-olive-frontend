import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meReducer from "./meReducers";
import registerReducer from "./registerReducer";
import searchUsersReducer from "./searchUsersReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  searchUsers: searchUsersReducer,
  me: meReducer,
});
export default reducers;
