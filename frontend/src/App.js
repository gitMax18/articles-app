import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/main.css";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import RegisterForm from "./components/layouts/RegisterForm";
import LoginForm from "./components/layouts/LoginForm";
import Articles from "./components/pages/Articles";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/inscription" component={RegisterForm} />
        <Route path="/connexion" component={LoginForm} />
        <Route path="/articles" component={Articles} />
      </Switch>
    </Router>
  );
}

export default App;
