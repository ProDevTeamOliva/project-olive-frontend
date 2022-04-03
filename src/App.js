import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthRoute from "./components/Auth/AuthRoute";
import LogInPage from "./components/LogInPage/LogInPage";
import NoPermission from "./components/MainPage/NoPermission";
import { connect } from "react-redux";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";
import languages from "./config/languages";
import RouteAfterLogin from "./components/Auth/RouteAfterLogin";

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

function App({ isAuth }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

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

const mapStateToProps = (state) => ({
  isAuth: state.logIn.isAuth,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
