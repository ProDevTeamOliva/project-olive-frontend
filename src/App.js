import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { logIn, signUp } from "./actions/authActions.js";
import AuthRoute from "./components/Auth/AuthRoute";
import LogInPage from "./components/LogInPage/LogInPage";
import MainPage from "./components/MainPage/MainPage";
import NoPermission from "./components/MainPage/NoPermission";
import { connect } from "react-redux";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";
import languages from "./config/languages";

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
      wait: true,
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

function App({ auth, logIn, signUp }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const isAuth = auth.isAuth;

  const loginSubmit = (data) => {
    logIn(data);
  };

  return (
    <div className="App" style={{ height: "100%" }}>
      <button onClick={() => changeLanguage("pl")}>PL</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
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
          <Route path="/noPermission" component={NoPermission}></Route>
          {isAuth ? <Redirect to="/user" /> : null}
        </Switch>
        <Route
          path="/login"
          component={() => <LogInPage loginSubmit={loginSubmit} />}
        />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (data) => dispatch(signUp(data)),
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
