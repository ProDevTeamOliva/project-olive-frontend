import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import meReducer from "./meReducers";
import mePostsReducer from "./mePostsReducer";
import mePicturesReducer from "./mePicturesReducer";
import meFriendsReducer from "./meFriendsReducer";
import registerReducer from "./registerReducer";
import postsReducer from "./postsReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import userPostsReducer from "./userPostsReducer";
import userPicturesReducer from "./userPicturesReducer";
import postsFiltered from "./postsFilteredByTag";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  posts: postsReducer,
  search: searchReducer,
  me: meReducer,
  mePosts: mePostsReducer,
  mePictures: mePicturesReducer,
  meFriends: meFriendsReducer,
  user: userReducer,
  userPosts: userPostsReducer,
  userPictures: userPicturesReducer,
  postsFiltered: postsFiltered,
});

export default reducers;
