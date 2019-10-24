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

function Likes(props) {
  const [moviesFavorites, setMoviesFavorites] = useState([]);
  const [seriesFavorites, setSeriesFavorites] = useState([]);
  const [moviesFavoritesDetails, setMoviesFavoritesDetails] = useState([]);
  const [seriesFavoritesDetails, setSeriesFavoritesDetails] = useState([]);
  const [pending, setPending] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    document.title = "O'Films | Mes favoris";
    M.AutoInit();
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    loadMoviesFavoritesDetails();
  }, [moviesFavorites]);

  useEffect(() => {
    loadSeriesFavoritesDetails();
  }, [seriesFavorites]);

  useEffect(() => {
    console.log("movieFavorites ", moviesFavorites);
    console.log("serieFavorites ", seriesFavorites);
    console.log("movieFavoritesDetails ", moviesFavoritesDetails);
    console.log("serieFavoritesDetails ", seriesFavoritesDetails);
  }, [moviesFavoritesDetails, seriesFavoritesDetails]);

  async function loadMoviesFavoritesDetails() {
    setMoviesFavoritesDetails([]);
    moviesFavorites.forEach(async movie => {
      try {
        const dataMovieDetail = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("MovieDetail ", dataMovieDetail.data);
        setMoviesFavoritesDetails(movieDetails => [
          ...movieDetails,
          dataMovieDetail.data
        ]);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function loadSeriesFavoritesDetails() {
    setSeriesFavoritesDetails([]);
    seriesFavorites.forEach(async serie => {
      try {
        const dataSerieDetail = await axios.get(
          `https://api.themoviedb.org/3/tv/${serie}?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`
        );
        console.log("SerieDetail ", dataSerieDetail.data);
        setSeriesFavoritesDetails(serieDetails => [
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
      setMoviesFavorites(dataUser.data[0].moviesFavorites);
      setSeriesFavorites(dataUser.data[0].seriesFavorites);
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
          <h4 style={{ color: "white", fontSize: "30px" }}>Films favorisés</h4>
          <br />
          {pending ? (
            <Spinner />
          ) : (
            <div style={{ display: "flex" }}>
              {moviesFavoritesDetails.length === 0 ? (
                <p>Vous n'avez pas encore favorisé de films</p>
              ) : (
                moviesFavoritesDetails.map(film => (
                  <a
                    href={`/film/${film.id}`}
                    to={`/film/${film.id}`}
                    key={film.id}
                    style={{ marginRight: "20px" }}
                  >
                    <img
                      src={
                        film.poster_path !== null
                          ? `http://image.tmdb.org/t/p/w500${film.poster_path}`
                          : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                      }
                      className="card-img-top"
                      alt={`Poster du film ${film.title}`}
                      style={{ width: "100px" }}
                    />
                    <p>{film.title}</p>
                  </a>
                ))
              )}
            </div>
          )}
          <br />
          <h4 style={{ color: "white", fontSize: "30px" }}>
            Séries favorisées
          </h4>
          <br />
          {pending ? (
            <Spinner />
          ) : (
            <div style={{ display: "flex" }}>
              {seriesFavoritesDetails.length === 0 ? (
                <p>Vous n'avez pas encore favorisé de séries</p>
              ) : (
                seriesFavoritesDetails.map(serie => (
                  <a
                    href={`/serie/${serie.id}`}
                    to={`/serie/${serie.id}`}
                    key={serie.id}
                    style={{ marginRight: "20px" }}
                  >
                    <img
                      src={
                        serie.poster_path !== null
                          ? `http://image.tmdb.org/t/p/w500${serie.poster_path}`
                          : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                      }
                      className="card-img-top"
                      alt={`Poster de la série ${serie.original_name}`}
                      style={{ width: "100px" }}
                    />
                    <p>{serie.original_name}</p>
                  </a>
                ))
              )}
            </div>
          )}
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

export default connect(mapStateToProps)(Likes);
