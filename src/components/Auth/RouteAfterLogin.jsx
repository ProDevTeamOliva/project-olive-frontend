import { Route, Switch } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Me from "../Me/Me";
import NoPermission from "../MainPage/NoPermission";
import User from "../User/User";
import PostsFiltered from "../Posts/PostsFiltered";
import Chat from "../Chat/Chat";

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
            id={parseInt(routerProps.match.params.id)}
            changeLanguage={changeLanguage}
          ></User>
        )}
      ></Route>
      <Route
        exact
        path="/posts/:tag"
        component={(routerProps) => (
          <PostsFiltered
            tag={routerProps.match.params.tag}
            changeLanguage={changeLanguage}
          ></PostsFiltered>
        )}
      ></Route>
      <Route
        exact
        path="/chat/:id"
        component={(routerProps) => (
          <Chat id={routerProps.match.params.id}></Chat>
        )}
      ></Route>

      <Route path="*" component={() => <NoPermission></NoPermission>}></Route>
    </Switch>
  );
}

export default RouteAfterLogin;
