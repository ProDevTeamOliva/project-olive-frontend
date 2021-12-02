import { Redirect, Route } from "react-router-dom";
import LogInPage from "../LogInPage/LogInPage";

function AuthRoute({ isAuth, component, exact, path }) {
  const redirect = () => {
    if (isAuth === "logout") {
      return <LogInPage isAuth={isAuth}></LogInPage>;
    } else if (isAuth) {
      return component;
    } else {
      return <Redirect to="/noPermission" />;
    }
  };
  return <Route exact={exact} path={path} render={redirect} />;
}
export default AuthRoute;
