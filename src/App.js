import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { logIn, signUp } from "./actions/authActions.js";
import AuthRoute from "./components/Auth/AuthRoute";
import LogInPage from "./components/LogInPage/LogInPage";
import MainPage from "./components/MainPage/MainPage";
import NoPermission from "./components/MainPage/NoPermission";
import { connect } from "react-redux";

function App({ auth, logIn, signUp }) {
  const isAuth = auth.isAuth;

  const loginSubmit = (data) => {
    logIn(data);
  };

  return (
    <div className="App" style={{ height: "100%" }}>
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
          <Route path="/noPermission" component={NoPermission}></Route>
          {isAuth ? <Redirect to="/user" /> : null}
        </Switch>
        <Route
          path="/login"
          component={() => <LogInPage loginSubmit={loginSubmit} />}
        />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
