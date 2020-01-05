/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import useForceUpdate from "use-force-update";
import StarRatingComponent from "react-star-rating-component";
import Flag from "react-world-flags";
import M from "materialize-css";
import $ from "jquery";
import moment from "moment";

import Nav from "../../Nav";
import PlaceholderThree from "../../Molecules/Placeholders/PlaceholderThree";
import Cast from "./Cast";
import Crew from "./Crew";
import BandesAnnonces from "./BandesAnnonces";
import Photos from "./Photos";
import SimilarFilms from "./SimilarFilms";
import FloatingChat from "../../FloatingChat";
import BandeauCookie from "../../BandeauCookie";
import placeholder from "../../../images/placeholder.png";

function DetailFilm(props) {
  const [filmDetail, setFilmDetail] = useState(false);
  const [castFilm, setCastFilm] = useState(false);
  const [crewFilm, setCrewFilm] = useState(false);
  const [similarFilms, setSimilarFilms] = useState(false);
  const [videosFilm, setVideosFilm] = useState(false);
  const [photosFilm, setPhotosFilm] = useState(false);
  const [keywordsFilm, setKeywordsFilm] = useState(false);
  const [convertedRuntime, setConvertedRuntime] = useState();
  const [favorited, setFavorited] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pending, setPending] = useState(true);
  const filmDetailUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const creditsFilmUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const similarFilmsUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
  const videosFilmUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const photosFilmUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const keywordsFilmUrl = `https://api.themoviedb.org/3/movie/${props.match.params.id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const tooltips = document.getElementsByClassName("material-tooltip");
    for (let i = 0; i < tooltips.length; i++) {
      tooltips[i].style.visibility = "hidden";
    }
  }, [liked, disliked, favorited]);

  useEffect(() => {
    loadFilmDetail();
    loadCreditsFilm();
    loadSimilarFilms();
    loadVideosFilm();
    loadPhotosFilm();
    loadKeywordsFilm();

    $(".sc-bxivhb").hover(function() {
      $(this).css("box-shadow", "grey 0 0 10px 2px");
    });
    if (props.auth.isAuthenticated) {
      loadUser();
    }

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  function convertRuntime(runtime) {
    let hours = Math.trunc(runtime / 60);
    let minutes = runtime % 60;
    setConvertedRuntime(hours + "h" + minutes);
  }

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/my-account/${props.auth.user.id}`
      );
      setLiked(dataUser.data[0].moviesLiked.includes(props.match.params.id));
      setDisliked(
        dataUser.data[0].moviesDisliked.includes(props.match.params.id)
      );
      setFavorited(
        dataUser.data[0].moviesFavorites.includes(props.match.params.id)
      );
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleFavorited() {
    setFavorited(!favorited);
    setErrorMessage(false);

    if (favorited) {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/remove/moviesFavorites/${props.match.params.id}`
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/add/moviesFavorites/${props.match.params.id}`,
          { userId: props.auth.user.id, movieId: props.match.params.id }
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function toggleLike() {
    if (disliked) {
      setErrorMessage(
        "Vous ne pouvez pas liker un film que vous avez disliké. Merci de retirer le dislike d'abord"
      );
      return;
    }

    setLiked(!liked);
    setErrorMessage(false);

    if (liked) {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/remove/moviesLiked/${props.match.params.id}`
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/add/moviesLiked/${props.match.params.id}`,
          { userId: props.auth.user.id, movieId: props.match.params.id }
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function toggleDislike() {
    if (liked) {
      setErrorMessage(
        "Vous ne pouvez pas disliker un film que vous avez liké. Merci de retirer le like d'abord"
      );
      return;
    }

    setDisliked(!disliked);
    setErrorMessage(false);

    if (disliked) {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/remove/moviesDisliked/${props.match.params.id}`
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUser = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/user/${props.auth.user.id}/add/moviesDisliked/${props.match.params.id}`,
          { userId: props.auth.user.id, movieId: props.match.params.id }
        );
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function loadFilmDetail() {
    try {
      const dataFilmDetail = await axios.get(filmDetailUrl);
      setFilmDetail(dataFilmDetail.data);
      setPending(false);
      document.title = `O'Films | ${dataFilmDetail.data.title}`;
      convertRuntime(dataFilmDetail.data.runtime);
      forceUpdate();
    } catch (error) {
      setPending(false);
      console.error(error);
    }
  }

  async function loadCreditsFilm() {
    try {
      const dataCreditsFilm = await axios.get(creditsFilmUrl);
      setCastFilm(dataCreditsFilm.data.cast);
      setCrewFilm(dataCreditsFilm.data.crew);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSimilarFilms() {
    try {
      const dataSimilarFilms = await axios.get(similarFilmsUrl);
      setSimilarFilms(dataSimilarFilms.data.results);
      setPending(false);
      document.getElementsByClassName("sc-bdVaJa")[0].style.width = "100%";
      $(".sc-bxivhb").css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      });
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadVideosFilm() {
    try {
      const dataVideosFilm = await axios.get(videosFilmUrl);
      setVideosFilm(dataVideosFilm.data.results);
      // setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPhotosFilm() {
    try {
      const dataPhotosFilm = await axios.get(photosFilmUrl);
      setPhotosFilm(dataPhotosFilm.data.posters);
      // setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadKeywordsFilm() {
    try {
      const dataKeywordsFilm = await axios.get(keywordsFilmUrl);
      setKeywordsFilm(dataKeywordsFilm.data.keywords);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        {pending ? (
          <PlaceholderThree />
        ) : (
          <>
            <div className="movies">
              <div
                className="row detail-film"
                key={filmDetail && filmDetail.id}
                style={{ width: "100%" }}
              >
                <div className="col s12 detail-film-poster">
                  <h2>{filmDetail && filmDetail.title}</h2>
                </div>
                <div className="col s12 m4">
                  <img
                    src={
                      filmDetail && filmDetail.poster_path !== null
                        ? `http://image.tmdb.org/t/p/w500${filmDetail &&
                            filmDetail.poster_path}`
                        : "https://via.placeholder.com/300x400/2C2F33/FFFFFF/png?text=Image+non+disponible"
                    }
                    style={{ width: "100%" }}
                    className="card-img-top"
                    title={filmDetail.title}
                    alt={`Poster du film ${filmDetail && filmDetail.title}`}
                  />
                  <StarRatingComponent
                    name="rate1"
                    starCount={10}
                    value={filmDetail && filmDetail.vote_average}
                  />
                  {props.auth.isAuthenticated && (
                    <div
                      className="row"
                      style={{
                        margin: "20px 0",
                        padding: "20px",
                        textAlign: "center"
                      }}
                    >
                      <div className="col s12 m3">
                        {!favorited ? (
                          <>
                            <p>Favoriser</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Ajouter ce film à mes favoris"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                color: "#95878B",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleFavorited}
                            >
                              star
                            </i>
                          </>
                        ) : (
                          <div style={{ color: "yellow" }}>
                            <p style={{ color: "inherit" }}>Favorisé</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Retirer ce film de mes favoris"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleFavorited}
                            >
                              star
                            </i>
                          </div>
                        )}
                      </div>
                      <div className="col s12 m3">
                        {!liked ? (
                          <>
                            <p>Liker</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Ajouter ce film à mes likes"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                color: "#95878B",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleLike}
                            >
                              thumb_up
                            </i>
                          </>
                        ) : (
                          <div style={{ color: "green" }}>
                            <p style={{ color: "inherit" }}>Liké</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Retirer ce film de mes likes"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                color: "green",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleLike}
                            >
                              thumb_up
                            </i>
                          </div>
                        )}
                      </div>
                      <div className="col s12 m3">
                        {!disliked ? (
                          <>
                            <p>Disliker</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Ajouter ce film à mes dislikes"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                color: "#95878B",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleDislike}
                            >
                              thumb_down
                            </i>
                          </>
                        ) : (
                          <div style={{ color: "red" }}>
                            <p style={{ color: "inherit" }}>Disliké</p>
                            <i
                              className="material-iconstooltipped"
                              data-position="bottom"
                              data-tooltip="Retirer ce film de mes dislikes"
                              data-micron="bounce"
                              style={{
                                cursor: "pointer",
                                color: "red",
                                display: "flex",
                                justifyContent: "center"
                              }}
                              onClick={toggleDislike}
                            >
                              thumb_down
                            </i>
                          </div>
                        )}
                      </div>
                      <div className="col s12 m3">
                        <p>Ajouter</p>
                        <i
                          className="material-iconstooltipped"
                          data-position="bottom"
                          data-tooltip="Ajouter ce film à une liste"
                          style={{
                            cursor: "pointer",
                            color: "#95878B",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          playlist_add
                        </i>
                      </div>
                    </div>
                  )}
                  {errorMessage && (
                    <p style={{ color: "red", textAlign: "center" }}>
                      {errorMessage}
                    </p>
                  )}
                  <p className="film-detail" style={{ marginTop: "20px" }}>
                    Titre original
                    <span>{filmDetail && filmDetail.original_title}</span>
                  </p>
                  <p className="film-detail">
                    Catégories
                    <span>
                      {filmDetail &&
                        filmDetail.genres &&
                        filmDetail.genres.map((genre, index) => (
                          <div
                            key={index}
                            className="no-margin-bottom text-capitalize film-detail-keywords"
                          >
                            <p>{genre.name}</p>
                          </div>
                        ))}
                    </span>
                  </p>
                  <p className="film-detail">
                    Date de sortie
                    <span>
                      {moment(filmDetail && filmDetail.release_date).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </p>
                  <p className="film-detail film-detail-duree">
                    Durée du film
                    <span>
                      {filmDetail && filmDetail.runtime} minutes (
                      {convertedRuntime})
                    </span>
                  </p>
                  <p className="film-detail">
                    Production
                    <span>
                      {filmDetail &&
                        filmDetail.production_companies.map(
                          (company, index) => (
                            <p
                              key={index}
                              className="no-margin-bottom production-companies"
                            >
                              <Link
                                href={`/company/${company.id}`}
                                to={`/company/${company.id}`}
                              >
                                {company.name}&nbsp;
                                {company.logo_path !== null && (
                                  <img
                                    src={`http://image.tmdb.org/t/p/w500${company.logo_path}`}
                                    style={{ width: "25px" }}
                                  />
                                )}
                              </Link>
                            </p>
                          )
                        )}
                    </span>
                  </p>
                  <p className="film-detail">
                    Pays de production
                    <span>
                      {filmDetail &&
                        filmDetail.production_countries &&
                        filmDetail.production_countries.map(country => (
                          <Flag
                            code={`${country.iso_3166_1}`}
                            key={country.name}
                            className="film-production-flag"
                          />
                        ))}
                    </span>
                  </p>
                  <p className="film-detail">
                    Budget
                    <span>
                      {filmDetail && filmDetail.budget.toLocaleString()} $
                    </span>
                  </p>
                  <p className="film-detail">
                    Recette
                    <span>
                      {filmDetail && filmDetail.revenue.toLocaleString()} $
                    </span>
                  </p>
                  {keywordsFilm && keywordsFilm.length > 0 && (
                    <p className="film-detail">
                      Mots-clés
                      <span>
                        <div className="film-detail-keywords">
                          {keywordsFilm.map(keyword => (
                            <p>
                              <Link
                                href={`/keyword/${keyword.id}`}
                                to={`/keyword/${keyword.id}`}
                              >
                                {keyword.name}
                              </Link>
                            </p>
                          ))}
                        </div>
                      </span>
                    </p>
                  )}
                </div>
                <div className="col s12 m8">
                  <div id="test1" className="col s12">
                    <div className="row">
                      <div className="col s12 col m4">
                        <div
                          style={{
                            textAlign: "center",
                            margin: "inherit",
                            padding: "20px"
                          }}
                        >
                          <p style={{ fontWeight: "300", fontSize: "1.25rem" }}>
                            Note moyenne
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.875rem",
                              color: "#0CD0FC"
                            }}
                          >
                            {filmDetail && filmDetail.vote_average}
                          </p>
                        </div>
                      </div>
                      <div className="col s12 col m4">
                        <div
                          style={{
                            textAlign: "center",
                            margin: "inherit",
                            padding: "20px"
                          }}
                        >
                          <p style={{ fontWeight: "300", fontSize: "1.25rem" }}>
                            Nombre de votes
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.875rem",
                              color: "#0CD0FC"
                            }}
                          >
                            {filmDetail && filmDetail.vote_count}
                          </p>
                        </div>
                      </div>
                      <div className="col s12 col m4">
                        <div
                          style={{
                            textAlign: "center",
                            margin: "inherit",
                            padding: "20px"
                          }}
                        >
                          <p style={{ fontWeight: "300", fontSize: "1.25rem" }}>
                            Popularité
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.875rem",
                              color: "#0CD0FC"
                            }}
                          >
                            {filmDetail && filmDetail.popularity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    {filmDetail.overview !== "" ? (
                      <p className="film-detail">
                        Synopsis
                        <span>{filmDetail && filmDetail.overview}</span>
                      </p>
                    ) : (
                      ""
                    )}
                    {castFilm && castFilm.length > 0 && (
                      <Cast castFilm={castFilm} />
                    )}
                    {crewFilm && crewFilm.length > 0 && (
                      <Crew crewFilm={crewFilm} />
                    )}
                  </div>
                  {videosFilm && videosFilm.length > 0 && (
                    <BandesAnnonces videosFilm={videosFilm} />
                  )}
                  {photosFilm && photosFilm.length > 0 && (
                    <Photos photosFilm={photosFilm} />
                  )}
                </div>
              </div>
            </div>
            <SimilarFilms similarFilms={similarFilms} />
          </>
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(DetailFilm);
