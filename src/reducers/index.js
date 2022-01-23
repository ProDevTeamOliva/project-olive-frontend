import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meFriendsReducer from "./meFriendsReducer";
import meReducer from "./meReducers";
import registerReducer from "./registerReducer";
import searchUsersReducer from "./searchUsersReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  searchUsers: searchUsersReducer,
  me: meReducer,
  meFriends: meFriendsReducer,
  user: userReducer,
});
export default reducers;
