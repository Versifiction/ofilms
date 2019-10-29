import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import { connect } from "react-redux";
import useForceUpdate from "use-force-update";

import "../../App.css";
import Nav from "../../components/Nav";
import Spinner from "../../components/Molecules/Spinner";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function LikesDislikes(props) {
  const [moviesLiked, setMoviesLiked] = useState([]);
  const [seriesLiked, setSeriesLiked] = useState([]);
  const [moviesDisliked, setMoviesDisliked] = useState([]);
  const [seriesDisliked, setSeriesDisliked] = useState([]);
  const [moviesLikedDetails, setMoviesLikedDetails] = useState([]);
  const [seriesLikedDetails, setSeriesLikedDetails] = useState([]);
  const [moviesDislikedDetails, setMoviesDislikedDetails] = useState([]);
  const [seriesDislikedDetails, setSeriesDislikedDetails] = useState([]);
  const [pending, setPending] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    document.title = "O'Films | Mes likes";
    M.AutoInit();
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    loadMoviesLikedDetails();
  }, [moviesLiked]);

  useEffect(() => {
    loadSeriesLikedDetails();
  }, [seriesLiked]);

  useEffect(() => {
    loadMoviesDislikedDetails();
  }, [moviesDisliked]);

  useEffect(() => {
    loadSeriesDislikedDetails();
  }, [seriesDisliked]);

  useEffect(() => {
    console.log("moviesLiked ", moviesLiked);
    console.log("seriesLiked ", seriesLiked);
    console.log("moviesDisliked ", moviesDisliked);
    console.log("seriesDisliked ", seriesDisliked);
    console.log("moviesLikedDetails ", moviesLikedDetails);
    console.log("seriesLikedDetails ", seriesLikedDetails);
    console.log("moviesDislikedDetails ", moviesDislikedDetails);
    console.log("seriesDislikedDetails ", seriesDislikedDetails);
  }, [
    moviesLikedDetails,
    seriesLikedDetails,
    moviesDislikedDetails,
    seriesDislikedDetails
  ]);

  async function loadMoviesLikedDetails() {
    setMoviesLikedDetails([]);
    moviesLiked.forEach(async movie => {
      try {
        const dataMovieDetail = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("MovieDetail ", dataMovieDetail.data);
        setMoviesLikedDetails(movieDetails => [
          ...movieDetails,
          dataMovieDetail.data
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function loadSeriesLikedDetails() {
    setSeriesLikedDetails([]);
    seriesLiked.forEach(async serie => {
      try {
        const dataSerieDetail = await axios.get(
          `https://api.themoviedb.org/3/tv/${serie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("SerieDetail ", dataSerieDetail.data);
        setSeriesLikedDetails(serieDetails => [
          ...serieDetails,
          dataSerieDetail.data
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function loadMoviesDislikedDetails() {
    setMoviesDislikedDetails([]);
    moviesDisliked.forEach(async movie => {
      try {
        const dataMovieDetail = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("MovieDetail ", dataMovieDetail.data);
        setMoviesDislikedDetails(movieDetails => [
          ...movieDetails,
          dataMovieDetail.data
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function loadSeriesDislikedDetails() {
    setSeriesDislikedDetails([]);
    seriesDisliked.forEach(async serie => {
      try {
        const dataSerieDetail = await axios.get(
          `https://api.themoviedb.org/3/tv/${serie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("SerieDetail ", dataSerieDetail.data);
        setSeriesDislikedDetails(serieDetails => [
          ...serieDetails,
          dataSerieDetail.data
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `http://localhost:5000/api/users/my-account/${props.auth.user.id}`
      );
      console.log("user ", dataUser);
      setMoviesLiked(dataUser.data[0].moviesLiked);
      setSeriesLiked(dataUser.data[0].seriesLiked);
      setMoviesDisliked(dataUser.data[0].moviesDisliked);
      setSeriesDisliked(dataUser.data[0].seriesDisliked);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="likes">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "30px"
            }}
          >
            Mes likes
          </h2>
          <div className="row">
            <div className="col s12">
              <h4 className="film-types-title" style={{ color: "white" }}>
                Films likés
              </h4>
              {pending ? (
                <Spinner />
              ) : (
                <>
                  <div
                    style={{ display: "flex" }}
                    className="film-types-datas scrolling-wrapper"
                  >
                    {moviesLikedDetails.length === 0 ? (
                      <p>Vous n'avez pas encore liké de films</p>
                    ) : (
                      moviesLikedDetails.map((film, index) => (
                        <a
                          className={`text-decoration-none card ${
                            index === 0 ? "" : "film-types-container"
                          }`}
                          href={`/film/${film.id}`}
                          to={`/film/${film.id}`}
                          key={film.id}
                        >
                          <img
                            src={
                              film.poster_path !== null
                                ? `http://image.tmdb.org/t/p/w500${film.poster_path}`
                                : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                            }
                            className={`${
                              index === 0
                                ? "film-types-img-first"
                                : "film-types-img"
                            }`}
                            alt={`Poster du film ${film.title}`}
                          />
                          <p className="film-types-title">{film.title}</p>
                        </a>
                      ))
                    )}
                  </div>
                  <hr className="hr-accueil" />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h4 className="film-types-title" style={{ color: "white" }}>
                Films dislikés
              </h4>
              {pending ? (
                <Spinner />
              ) : (
                <>
                  <div
                    style={{ display: "flex" }}
                    className="film-types-datas scrolling-wrapper"
                  >
                    {moviesDislikedDetails.length === 0 ? (
                      <p>Vous n'avez pas encore disliké de films</p>
                    ) : (
                      moviesDislikedDetails.map((film, index) => (
                        <a
                          className={`text-decoration-none card ${
                            index === 0 ? "" : "film-types-container"
                          }`}
                          href={`/film/${film.id}`}
                          to={`/film/${film.id}`}
                          key={film.id}
                        >
                          <img
                            src={
                              film.poster_path !== null
                                ? `http://image.tmdb.org/t/p/w500${film.poster_path}`
                                : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                            }
                            className={`${
                              index === 0
                                ? "film-types-img-first"
                                : "film-types-img"
                            }`}
                            alt={`Poster du film ${film.title}`}
                          />
                          <p className="film-types-title">{film.title}</p>
                        </a>
                      ))
                    )}
                  </div>
                  <hr className="hr-accueil" />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h4 className="film-types-title" style={{ color: "white" }}>
                Séries likées
              </h4>
              {pending ? (
                <Spinner />
              ) : (
                <>
                  <div
                    style={{ display: "flex" }}
                    className="film-types-datas scrolling-wrapper"
                  >
                    {seriesLikedDetails.length === 0 ? (
                      <p>Vous n'avez pas encore liké de séries</p>
                    ) : (
                      seriesLikedDetails.map((serie, index) => (
                        <a
                          className={`text-decoration-none card ${
                            index === 0 ? "" : "film-types-container"
                          }`}
                          href={`/serie/${serie.id}`}
                          to={`/serie/${serie.id}`}
                          key={serie.id}
                        >
                          <img
                            src={
                              serie.poster_path !== null
                                ? `http://image.tmdb.org/t/p/w500${serie.poster_path}`
                                : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                            }
                            className={`${
                              index === 0
                                ? "film-types-img-first"
                                : "film-types-img"
                            }`}
                            alt={`Poster de la série ${serie.original_name}`}
                          />
                          <p className="film-types-title">
                            {serie.original_name}
                          </p>
                        </a>
                      ))
                    )}
                  </div>
                  <hr className="hr-accueil" />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <h4 className="film-types-title" style={{ color: "white" }}>
                Séries dislikées
              </h4>
              {pending ? (
                <Spinner />
              ) : (
                <>
                  <div
                    style={{ display: "flex" }}
                    className="film-types-datas scrolling-wrapper"
                  >
                    {seriesDislikedDetails.length === 0 ? (
                      <p>Vous n'avez pas encore disliké de séries</p>
                    ) : (
                      seriesDislikedDetails.map((serie, index) => (
                        <a
                          className={`text-decoration-none card ${
                            index === 0 ? "" : "film-types-container"
                          }`}
                          href={`/serie/${serie.id}`}
                          to={`/serie/${serie.id}`}
                          key={serie.id}
                        >
                          <img
                            src={
                              serie.poster_path !== null
                                ? `http://image.tmdb.org/t/p/w500${serie.poster_path}`
                                : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                            }
                            className={`${
                              index === 0
                                ? "film-types-img-first"
                                : "film-types-img"
                            }`}
                            alt={`Poster de la série ${serie.original_name}`}
                          />
                          <p className="film-types-title">
                            {serie.original_name}
                          </p>
                        </a>
                      ))
                    )}
                  </div>
                  <hr className="hr-accueil" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(LikesDislikes);
