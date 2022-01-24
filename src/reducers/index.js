import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meReducer from "./meReducers";
import mePostsReducer from "./mePostsReducer";
import mePicturesReducer from "./mePicturesReducer";
import meFriendsReducer from "./meFriendsReducer";
import registerReducer from "./registerReducer";
import postsReducer from "./postsReducer";
import searchUsersReducer from "./searchUsersReducer";
import userReducer from "./userReducer";
import userPostsReducer from "./userPostsReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  posts: postsReducer,
  searchUsers: searchUsersReducer,
  me: meReducer,
  mePosts: mePostsReducer,
  mePictures: mePicturesReducer,
  meFriends: meFriendsReducer,
  user: userReducer,
  userPosts: userPostsReducer,
});

export default reducers;
