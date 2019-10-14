import React from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/authActions";
import "./App.css";
import store from "./store";

import Accueil from "./pages/Accueil";
import Bibliotheque from "./pages/Bibliotheque";
import Films from "./pages/Films";
import Series from "./pages/Series";
import AfficheFilms from "./components/films/AfficheFilms";
import DetailFilm from "./components/films/DetailFilm";
import BestRatedFilms from "./components/films/BestRatedFilms";
import TendancesFilms from "./components/films/TendancesFilms";
import DetailSerie from "./components/series/DetailSerie";
import BestRatedSeries from "./components/series/BestRatedSeries";
import TendancesSeries from "./components/series/TendancesSeries";
import Keyword from "./components/keywords";
import DetailCompany from "./components/company/DetailCompany";
import DetailPerson from "./components/persons/DetailPerson";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Forum from "./pages/Forum";
import Chat from "./pages/Chat";
import Apropos from "./pages/Apropos";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Users from "./pages/Users";
import User from "./pages/User";
import MonCompte from "./pages/MonCompte";
import PrivateRoute from "./components/PrivateRoute";
import Erreur from "./pages/Erreur";
import BandeauCookie from "./components/BandeauCookie";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Accueil} />
      <Route path="/" exact component={BandeauCookie} />
      <Route path="/bibliotheque" exact component={Bibliotheque} />
      <Route path="/films" exact component={Films} />
      <Route path="/series" exact component={Series} />
      <Route path="/films/affiche" exact component={AfficheFilms} />
      <Route path="/film/:id" exact component={DetailFilm} />
      <Route path="/films/mieux-notes" exact component={BestRatedFilms} />
      <Route path="/films/tendances" exact component={TendancesFilms} />
      <Route path="/serie/:id" exact component={DetailSerie} />
      <Route path="/series/mieux-notees" exact component={BestRatedSeries} />
      <Route path="/series/tendances" exact component={TendancesSeries} />
      <Route path="/person/:id" exact component={DetailPerson} />
      <Route path="/keyword/:id" exact component={Keyword} />
      <Route path="/company/:id" exact component={DetailCompany} />
      <Route path="/connexion" exact component={Connexion} />
      <Route path="/inscription" exact component={Inscription} />
      <Route path="/forum" exact component={Forum} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/a-propos" exact component={Apropos} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/mentions-legales" exact component={MentionsLegales} />
      <Route
        path="/politique-confidentialite"
        exact
        component={PolitiqueConfidentialite}
      />
      <Route path="/users" exact component={Users} />
      <Route path="/user/:username" exact component={User} />
      <PrivateRoute path="/mon-compte" exact component={MonCompte} />
      <Route component={Erreur} />
    </Switch>
  );
}

export default Router;
