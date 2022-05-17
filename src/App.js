import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthRoute from "./components/Auth/AuthRoute";
import LogInPage from "./components/LogInPage/LogInPage";
import NoPermission from "./components/MainPage/NoPermission";
import { useSelector, useDispatch } from "react-redux";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";
import languages from "./config/languages";
import RouteAfterLogin from "./components/Auth/RouteAfterLogin";
import { memo, useCallback, useEffect } from "react";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types/loginTypes";

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

    window.addEventListener("storage", handleToken);

    return () => window.removeEventListener("storage", handleToken);
  }, [dispatch]);

  return (
    <div className="App" style={{ height: "100%" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/noPermission" component={NoPermission}></Route>
          <AuthRoute
            component={<RouteAfterLogin changeLanguage={changeLanguage} />}
            isAuth={isAuth}
            exact
            path="*"
          ></AuthRoute>
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
