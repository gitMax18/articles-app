import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/pages/HomePage";
import Articles from "./components/pages/ArticlesPage";
import FullArticle from "./components/pages/ArticlePage";
import ProfilUserPage from "./components/pages/ProfilUserPage";
import CreateArticlePage from "./components/pages/CreateArticlePage";
import ConnexionPage from "./components/pages/ConnexionPage";
import UpdatePaperPage from "./components/pages/UpdateArticlePage";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/layouts/NotFound";
import About from "./components/pages/About";

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-16">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/connexion/:type/:token" component={ConnexionPage} />
          <Route path="/connexion/:type" component={ConnexionPage} />
          <Route path="/articles" component={Articles} />
          <Route path="/article/nouveau" component={CreateArticlePage} />
          <Route path="/user/profil" component={ProfilUserPage} />
          <Route path="/article/update/:id" component={UpdatePaperPage} />
          <Route path="/article/:id" component={FullArticle} />
          <Route path="/a-propos" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
