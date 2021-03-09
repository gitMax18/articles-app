import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/main.css";
import Header from "./components/layouts/Header/Header";
import Home from "./components/pages/HomePage/HomePage";
import Articles from "./components/pages/ArticlesPage/ArticlesPage";
import FullArticle from "./components/pages/ArticlePage/ArticlePage";
import ProfilUserPage from "./components/pages/ProfilUserPage/ProfilUserPage";
import CreateArticlePage from "./components/pages/CreateArticlePage/CreateArticlePage";
import ConnexionPage from "./components/pages/ConnexionPage/ConnexionPage";

function App() {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/connexion/:type" component={ConnexionPage} />
          <Route path="/articles" component={Articles} />
          <Route path="/article/nouveau" component={CreateArticlePage} />
          <Route path="/user/profil" component={ProfilUserPage} />
          <Route path="/article/:id" component={FullArticle} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
