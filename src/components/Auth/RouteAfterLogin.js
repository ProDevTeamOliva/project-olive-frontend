import { Route, Switch } from "react-router-dom";
import MainPage from "../../components/MainPage/MainPage";
import Me from "../../components/Me/Me";
import NoPermission from "../MainPage/NoPermission";
import User from "../User/User";

function RouteAfterLogin({ changeLanguage }) {
  return (
    <Switch>
      <Route
        exact
        path="/main"
        component={() => <MainPage changeLanguage={changeLanguage}></MainPage>}
      ></Route>
      <Route
        exact
        path="/me"
        component={() => <Me changeLanguage={changeLanguage}></Me>}
      ></Route>
      <Route
        exact
        path="/user/:id"
        component={(routerProps) => (
          <User
            id={routerProps.match.params.id}
            changeLanguage={changeLanguage}
          ></User>
        )}
      ></Route>

      <Route path="*" component={() => <NoPermission></NoPermission>}></Route>
    </Switch>
  );
}

export default RouteAfterLogin;
