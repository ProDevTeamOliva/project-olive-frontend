import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meFriendsReducer from "./meFriendsReducer";
import mePicturesReducer from "./mePicturesReducer";
import meReducer from "./meReducers";
import registerReducer from "./registerReducer";
import postsReducer from "./postsReducer";
import searchUsersReducer from "./searchUsersReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  posts: postsReducer,
  searchUsers: searchUsersReducer,
  me: meReducer,
  meFriends: meFriendsReducer,
  mePictures: mePicturesReducer,
});

export default reducers;
