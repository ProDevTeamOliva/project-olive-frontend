import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import registerReducer from "./registerReducer";
import postsReducer from "./postsReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
  posts: postsReducer,
});
export default reducers;
