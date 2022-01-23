import { Redirect, Route } from "react-router-dom";

function AuthRoute({ isAuth, component, exact, path }) {
  const redirect = () => {
    if (isAuth === "logout") {
      return <Redirect to="/login" />;
    } else if (isAuth) {
      return component;
    } else {
      return <Redirect to="/noPermission" />;
    }
  };
  return <Route exact={exact} path={path} render={redirect} />;
}
export default AuthRoute;
