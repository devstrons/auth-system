import "./App.css";
import axios from "axios";
import Homepage from "./components/homepage"
import Login from "./components/login"
import Register from "./components/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers = {
  // "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
};
// axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
