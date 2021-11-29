import { Redirect, Route } from "react-router-dom";

function AuthRoute({ isAuth, component, exact, path }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAuth ? component : <Redirect to="/noPermission" />)}
    />
  );
}
export default AuthRoute;
