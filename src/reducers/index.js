import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meFriendsReducer from "./meFriendsReducer";
import mePicturesReducer from "./mePicturesReducer";
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
  mePictures: mePicturesReducer,
});

export default reducers;
