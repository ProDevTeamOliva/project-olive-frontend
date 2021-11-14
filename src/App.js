import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthRoute from "./components/Auth/AuthRoute.jsx";
import LogInPage from "./components/LogInPage/LogInPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import NotPermission from "./components/MainPage/NotPermission.jsx";

function App() {
  const [isAuth, setAuth] = useState(false);

  const changeAuth = (value) => {
    setAuth(value);
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
          component={() => <LogInPage changeAuth={changeAuth} />}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
