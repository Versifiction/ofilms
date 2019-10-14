/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useForceUpdate from "use-force-update";
import StarRatingComponent from "react-star-rating-component";
import Flag from "react-world-flags";
import M from "materialize-css";
import $ from "jquery";
import moment from "moment";

import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";
import Cast from "./Cast";
import Crew from "./Crew";
import BandesAnnonces from "./BandesAnnonces";
import Photos from "./Photos";
import SimilarFilms from "./SimilarFilms";
import placeholder from "../../../images/placeholder.png";

function DetailFilm({ match }) {
  const [filmDetail, setFilmDetail] = useState(false);
  const [castFilm, setCastFilm] = useState(false);
  const [crewFilm, setCrewFilm] = useState(false);
  const [similarFilms, setSimilarFilms] = useState(false);
  const [videosFilm, setVideosFilm] = useState(false);
  const [photosFilm, setPhotosFilm] = useState(false);
  const [keywordsFilm, setKeywordsFilm] = useState(false);
  const [convertedRuntime, setConvertedRuntime] = useState();
  const [pending, setPending] = useState(true);
  const filmDetailUrl = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const creditsFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const similarFilmsUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
  const videosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const photosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const keywordsFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
  const forceUpdate = useForceUpdate();

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

  async function loadFilmDetail() {
    try {
      const dataFilmDetail = await axios.get(filmDetailUrl);
      console.log("filmDetail ", dataFilmDetail);
      setFilmDetail(dataFilmDetail.data);
      setPending(false);
      console.log("poster ", dataFilmDetail.data.poster_path);
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
      console.log("castFilm ", dataCreditsFilm.data.cast);
      console.log("crewFilm ", dataCreditsFilm.data.crew);
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
      console.log("similarFilms ", dataSimilarFilms);
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
      console.log("videosFilm ", dataVideosFilm);
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
      console.log("photosFilm ", dataPhotosFilm);
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
      console.log("keywordsFilm ", dataKeywordsFilm);
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
        <div className="movies">
          {pending ? (
            <Spinner />
          ) : (
            <>
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
                    alt={`Poster du film ${filmDetail && filmDetail.title}`}
                  />
                  <StarRatingComponent
                    name="rate1"
                    starCount={10}
                    value={filmDetail && filmDetail.vote_average}
                  />
                  <div
                    className="row"
                    style={{ margin: "20px 0", padding: "20px" }}
                  >
                    <div
                      className="col s12 m4"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <i
                        className="material-icons tooltipped"
                        data-position="bottom"
                        data-tooltip="Ajouter ce film à mes likes"
                        style={{ cursor: "pointer", color: "#95878B" }}
                      >
                        thumb_up
                      </i>
                    </div>
                    <div
                      className="col s12 m4"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <i
                        className="material-icons tooltipped"
                        data-position="bottom"
                        data-tooltip="Ajouter ce film à mes dislikes"
                        style={{ cursor: "pointer", color: "#95878B" }}
                      >
                        thumb_down
                      </i>
                    </div>
                    <div
                      className="col s12 m4"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <i
                        className="material-icons tooltipped"
                        data-position="bottom"
                        data-tooltip="Ajouter ce film à une liste"
                        style={{ cursor: "pointer", color: "#95878B" }}
                      >
                        playlist_add
                      </i>
                    </div>
                  </div>
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
                          <p style={{ fontWeight: "300", fontSize: "20px" }}>
                            Note moyenne
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "30px",
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
                          <p style={{ fontWeight: "300", fontSize: "20px" }}>
                            Nombre de votes
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "30px",
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
                          <p style={{ fontWeight: "300", fontSize: "20px" }}>
                            Popularité
                          </p>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "30px",
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
            </>
          )}
        </div>
        <SimilarFilms similarFilms={similarFilms} />
      </div>
    </>
  );
}

export default DetailFilm;
