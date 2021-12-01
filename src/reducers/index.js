import { combineReducers } from "redux";
import logInReducer from "./logInReducer";
import registerReducer from "./registerReducer";

const reducers = combineReducers({
  logIn: logInReducer,
  register: registerReducer,
});
export default reducers;
