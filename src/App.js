import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LogInPage from "./components/LogInPage/LogInPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={LogInPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
