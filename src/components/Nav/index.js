/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import useForceUpdate from "use-force-update";
import M from "materialize-css";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

import "../../App.css";

function Nav(props) {
  const [sideNavActive, setSideNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [pending, setPending] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const elementPosition = $(".navbar").offset();
    M.AutoInit();

    //   $(window).scroll(function() {
    //     if ($(window).scrollTop() > elementPosition.top) {
    //       $(".navbar")
    //         .css("position", "fixed")
    //         .css("top", "0");
    //     } else {
    //       $(".navbar").css("position", "relative");
    //     }
    //   });
  });

  function logout(e) {
    e.preventDefault();
    props.logoutUser();
    M.toast({ html: "Vous vous êtes déconnecté" });
  }

  function toggleSideNav() {
    setSideNavActive(!sideNavActive);
  }

  async function handleChange(e) {
    setSearchInputValue(e.target.value);

    try {
      const searchResult = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&query=${e.target.value}`
      );
      setSearchResult(searchResult.data.results);
      setPending(false);
    } catch (error) {
      console.error(error);
    }

    forceUpdate();
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <div className="row container">
            <div className="col s12">
              <div
                data-target="slide-out"
                className="sidenav-trigger show-on-large"
                style={{ height: "64px" }}
              >
                <i
                  className="material-icons colored"
                  style={{ cursor: "pointer" }}
                >
                  menu
                </i>
              </div>
              <a
                href="/"
                className="brand-logo center"
                style={{
                  color: "#0CD0FC",
                  textTransform: "uppercase",
                  lineHeight: "64px"
                }}
              >
                O'Films
              </a>
              <ul className="right">
                <li>
                  <form action="" className="browser-default right">
                    <input
                      id="search-input"
                      placeholder={
                        searchActive
                          ? "Rechercher un film, une série, un acteur..."
                          : ""
                      }
                      type="text"
                      className="browser-default search-field"
                      name="q"
                      value={searchInputValue}
                      autoComplete="off"
                      aria-label="Search box"
                      style={{
                        borderBottom: searchActive ? "2px solid #0cd0fc" : "",
                        backgroundColor: "transparent"
                      }}
                      onFocus={() => {
                        setSearchActive(true);
                      }}
                      // onBlur={() => {
                      //   setSearchActive(false);
                      //   setSearchInputValue("");
                      //   setSearchResult();
                      // }}
                      onChange={e => handleChange(e)}
                    />
                    <label
                      htmlFor="search-input"
                      className={searchActive ? "active" : ""}
                    >
                      {searchInputValue.length === 0 ? (
                        <i
                          className="material-icons colored search-icontooltipped"
                          data-position="bottom"
                          data-tooltip="Rechercher un film, une série, un acteur..."
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSearchActive(true);
                            setSearchInputValue("");
                            setSearchResult();
                          }}
                        >
                          search
                        </i>
                      ) : (
                        <i
                          className="material-icons colored search-close-icontooltipped"
                          data-position="bottom"
                          data-tooltip="Vider la valeur du champ"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSearchInputValue("");
                          }}
                        >
                          close
                        </i>
                      )}
                    </label>
                    {searchActive && (
                      <div
                        className="search-popup"
                        style={{ backgroundColor: "#232d32" }}
                      >
                        <div className="search-content">
                          <ul className="popup-list">
                            {searchResult &&
                              searchResult.map(result => (
                                <li
                                  key={result.id}
                                  style={{ marginBottom: "30px" }}
                                >
                                  <a
                                    className="grey-text"
                                    href={`/${(result.media_type === "movie" &&
                                      "film") ||
                                      (result.media_type === "tv" && "serie") ||
                                      (result.media_type === "person" &&
                                        "person")}/${result.id}`}
                                    style={{
                                      height: "100px",
                                      display: "flex",
                                      alignItems: "center"
                                    }}
                                    onClick={() => {
                                      setSearchActive(false);
                                    }}
                                  >
                                    {result.media_type === "person" ||
                                    result.media_type === "tv" ? (
                                      <>
                                        <span>
                                          <img
                                            src={
                                              result.profile_path == null
                                                ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                                : `http://image.tmdb.org/t/p/w500${result.profile_path}`
                                            }
                                            style={{ width: "50px" }}
                                          />
                                        </span>
                                        <p
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginLeft: "10px"
                                          }}
                                        >
                                          {result.name}
                                          <span
                                            style={{
                                              fontSize: "0.625rem",
                                              textTransform: "uppercase",
                                              marginLeft: "6px",
                                              backgroundColor: "#95878b",
                                              color: "white",
                                              padding: "0px 10px"
                                            }}
                                          >
                                            {result.media_type === "person"
                                              ? "Personne"
                                              : "Série"}
                                          </span>
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <span>
                                          <img
                                            src={
                                              result.poster_path == null
                                                ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                                : `http://image.tmdb.org/t/p/w500${result.poster_path}`
                                            }
                                            style={{ width: "50px" }}
                                            title={result.title}
                                          />
                                        </span>
                                        <p
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginLeft: "10px"
                                          }}
                                        >
                                          {result.title}
                                          <span
                                            style={{
                                              fontSize: "0.625rem",
                                              textTransform: "uppercase",
                                              marginLeft: "6px",
                                              backgroundColor: "#95878b",
                                              color: "white",
                                              padding: "0px 10px"
                                            }}
                                          >
                                            Film
                                          </span>
                                        </p>
                                      </>
                                    )}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </form>
                </li>
                {props.auth.isAuthenticated ? (
                  <>
                    <li>
                      <a
                        className="tooltipped"
                        data-position="bottom"
                        data-tooltip="Accéder à mon profil"
                        href="/mon-compte"
                      >
                        <i className="material-icons colored">person</i>
                        <span className="account-text">Mon compte</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="tooltipped"
                        data-position="bottom"
                        data-tooltip="Me déconnecter"
                        href="/"
                        onClick={logout}
                      >
                        <i className="material-icons colored">exit_to_app</i>
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a
                      className="tooltipped"
                      data-position="bottom"
                      data-tooltip="Se connecter / S'inscrire"
                      href="/connexion"
                    >
                      <i className="material-icons colored">person</i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ul
        id="slide-out"
        className="sidenav dark"
        style={{ transform: sideNavActive ? "translateX(0%)" : "" }}
        onClick={toggleSideNav}
      >
        <div
          className="subnav"
          style={{ position: "relative", height: "100%" }}
        >
          <li>
            <div className="user-view">
              <div>
                <a href="/">O'Films</a>
              </div>
            </div>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/films"
              to="/films"
            >
              <i className="material-icons colored">local_movies</i>Films
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/series"
              to="/series"
            >
              <i className="material-icons colored">tv</i>Séries
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/bibliotheque"
              to="/bibliotheque"
            >
              <i className="material-icons colored">view_list</i>
              <span id="txt1">Bibliothèque</span>
            </NavLink>
          </li>
          {props.auth.isAuthenticated && (
            <>
              <div className="divider"></div>
              <li>
                <NavLink
                  className=""
                  activeClassName="active"
                  href="/favoris"
                  to="/favoris"
                >
                  <i className="material-icons colored">star</i>
                  <span id="txt1">Mes favoris</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=""
                  activeClassName="active"
                  href="/likes-dislikes"
                  to="/likes-dislikes"
                >
                  <i className="material-icons colored">thumbs_up_down</i>
                  <span id="txt1">Mes likes / dislikes</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=""
                  activeClassName="active"
                  href="/listes"
                  to="/listes"
                >
                  <i className="material-icons colored">playlist_play</i>
                  <span id="txt1">Mes listes</span>
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/forum"
              to="/forum"
            >
              <i className="material-icons colored">forum</i>
              <span id="txt1">Forum</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/chat"
              to="/chat"
            >
              <i className="material-icons colored">chat</i>
              <span id="txt1">Chat</span>
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/a-propos"
              to="/a-propos"
            >
              <i className="material-icons colored">info</i>
              <span id="txt1">À propos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/faq"
              to="/faq"
            >
              <i className="material-icons colored">format_list_bulleted</i>
              <span id="txt1">FAQ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/contact"
              to="/contact"
            >
              <i className="material-icons colored">contact_mail</i>
              <span id="txt1">Contact</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className=""
              activeClassName="active"
              href="/mentions-legales"
              to="/mentions-legales"
            >
              <i className="material-icons colored">format_align_left</i>
              <span id="txt1">Mentions légales</span>
            </NavLink>
          </li>
          <div className="row" style={{ marginTop: "40px", width: "100%" }}>
            <div
              className="col s4"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem"
              }}
            >
              <i className="fab fa-twitter"></i>
            </div>
            <div
              className="col s4"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem"
              }}
            >
              <i className="fab fa-facebook-f"></i>
            </div>
            <div
              className="col s4"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem"
              }}
            >
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </div>
      </ul>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Nav));

// export default withRouter(Nav);
