import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { logIn, signUp } from "./actions/authActions.js";
import AuthRoute from "./components/Auth/AuthRoute.jsx";
import LogInPage from "./components/LogInPage/LogInPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import NotPermission from "./components/MainPage/NotPermission.jsx";
import {connect} from "react-redux"
function App({auth, logIn, signUp}) {
  const isAuth = auth.isAuth

  const loginSubmit = (data) => {
    logIn(data)
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <AuthRoute
            component={<MainPage></MainPage>}
            isAuth={isAuth}
            exact
            path="/user"
          ></AuthRoute>
          <Route path="/notPermission" component={NotPermission}></Route>
          {isAuth ? <Redirect to="/user" /> : null}
        </Switch>
        <Route
          path="/login"
          component={() => <LogInPage loginSubmit={loginSubmit} />}
        ></Route>
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
  logIn: (data) => dispatch(logIn(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
