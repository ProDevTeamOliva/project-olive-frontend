import { Redirect, Route } from "react-router-dom";

function AuthRoute({ isAuth, component, exact, path }) {
  console.log(isAuth);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAuth ? component : <Redirect to="/notPermission" />)}
    />
  );
}
export default AuthRoute;
