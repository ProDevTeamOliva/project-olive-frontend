import languages from "./config/languages";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next, useTranslation } from "react-i18next";
import { useCallback, useContext, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserSocketContext } from "./UserSocketContext";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types/loginTypes";
import { getMeFriends } from "./actions/meActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NoPermission from "./components/MainPage/NoPermission";
import AuthRoute from "./components/Auth/AuthRoute";
import RouteAfterLogin from "./components/Auth/RouteAfterLogin";
import LogInPage from "./components/LogInPage/LogInPage";

const language = languages.find(
  (value) => value === localStorage.getItem("language")
);

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: language || "en",
    fallbackLng: "en",
    ns: ["main"],
    defaultNS: "main",
    react: {
      bindI18n: "languageChanged",
      bindI18nStore: "",
      transEmptyNodeValue: "",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem("language", lng);
    },
    [i18n]
  );

  const isAuth = useSelector((state) => state.logIn.isAuth);

  const dispatch = useDispatch();
  const userSocket = useContext(UserSocketContext);

  useEffect(() => {
    const handleToken = (e) => {
      if (e.key === "token" && !e.oldValue && e.newValue) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { message: "apiLoginSuccess" },
        });
      } else if (e.key === "token" && e.oldValue && !e.newValue) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: { message: "apiLogoutSuccess" },
        });
      }
    };

    const getMeFriendsCallback = () => {
      dispatch(getMeFriends());
    };

    window.addEventListener("storage", handleToken);

    userSocket?.on("friendPendingSuccess", getMeFriendsCallback);
    userSocket?.on("friendAcceptSuccess", getMeFriendsCallback);
    userSocket?.on("friendRemoveSuccess", getMeFriendsCallback);
    userSocket?.on("newMessage", getMeFriendsCallback);
    userSocket?.on("readConversation", getMeFriendsCallback);

    return () => {
      window.removeEventListener("storage", handleToken);

      userSocket?.off("friendPendingSuccess", getMeFriendsCallback);
      userSocket?.off("friendAcceptSuccess", getMeFriendsCallback);
      userSocket?.off("friendRemoveSuccess", getMeFriendsCallback);
      userSocket?.off("newMessage", getMeFriendsCallback);
      userSocket?.off("readConversation", getMeFriendsCallback);
    };
  }, [dispatch, userSocket]);

  return (
    <div className="App" style={{ height: "100%" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/noPermission" component={NoPermission} />
          <AuthRoute
            component={<RouteAfterLogin changeLanguage={changeLanguage} />}
            isAuth={isAuth}
            exact
            path="*"
          />
        </Switch>
        <Route
          path="/login"
          component={() => (
            <LogInPage isAuth={isAuth} changeLanguage={changeLanguage} />
          )}
        />
      </Router>
    </div>
  );
}

export default memo(App);
