import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useForceUpdate from "use-force-update";
import StarRatingComponent from "react-star-rating-component";
import Flag from "react-world-flags";
import ItemsCarousel from "react-items-carousel";
import $ from "jquery";
import moment from "moment";

import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";
import Cast from "../../films/DetailFilm/Cast";
import Crew from "../../films/DetailFilm/Crew";
import Photos from "../../films/DetailFilm/Photos";
//import placeholder from '../../../images/placeholder.png';

function DetailSerie({ match }) {
  const [serieDetail, setSerieDetail] = useState(false);
  const [castSerie, setCastSerie] = useState(false);
  const [crewSerie, setCrewSerie] = useState(false);
  const [similarSeries, setSimilarSeries] = useState(false);
  const [videosSerie, setVideosSerie] = useState(false);
  const [photosSerie, setPhotosSerie] = useState(false);
  const [keywordsSerie, setKeywordsSerie] = useState(false);
  const [seeAllVideos, setSeeAllVideos] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [pending, setPending] = useState(true);
  const serieDetailUrl = `https://api.themoviedb.org/3/serie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const creditsSerieUrl = `https://api.themoviedb.org/3/serie/${match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const similarSeriesUrl = `https://api.themoviedb.org/3/serie/${match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
  const videosSerieUrl = `https://api.themoviedb.org/3/serie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const photosSerieUrl = `https://api.themoviedb.org/3/serie/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const keywordsSerieUrl = `https://api.themoviedb.org/3/serie/${match.params.id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loadSerieDetail();
    loadCreditsSerie();
    loadSimilarSeries();
    loadVideosSerie();
    loadPhotosSerie();
    loadKeywordsSerie();

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadSerieDetail() {
    try {
      const dataSerieDetail = await axios.get(serieDetailUrl);
      console.log("SeriesDetail ", dataSerieDetail);
      setSerieDetail(dataSerieDetail.data);
      setPending(false);
      document.title = `O'Films | ${dataSerieDetail.data.original_name}`;
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCreditsSerie() {
    try {
      const dataCreditsSerie = await axios.get(creditsSerieUrl);
      console.log("castSerie ", dataCreditsSerie.data.cast);
      console.log("crewSerie ", dataCreditsSerie.data.crew);
      setCastSerie(dataCreditsSerie.data.cast);
      setCrewSerie(dataCreditsSerie.data.crew);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSimilarSeries() {
    try {
      const dataSimilarSeries = await axios.get(similarSeriesUrl);
      console.log("similarSeries ", dataSimilarSeries);
      setSimilarSeries(dataSimilarSeries.data.results);
      setPending(false);
      document.getElementsByClassName("sc-bdVaJa")[0].style.width = "100%";
      $("#nav-photos").hide();
      $(".nav-link").click(function(event) {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $(this)
          .attr("aria-selected", true)
          .siblings()
          .attr("aria-selected", false);
        event.target.id === "nav-photos-tab"
          ? $("#nav-photos").show()
          : $("#nav-photos").hide();
        $("body")
          .find(`[aria-labelledby="${event.target.id}"`)
          .addClass("show active")
          .siblings()
          .removeClass("show active");
      });
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

  async function loadVideosSerie() {
    try {
      const dataVideosSerie = await axios.get(videosSerieUrl);
      console.log("videosSerie ", dataVideosSerie);
      setVideosSerie(dataVideosSerie.data.results);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPhotosSerie() {
    try {
      const dataPhotosSerie = await axios.get(photosSerieUrl);
      console.log("photosSeries ", dataPhotosSerie);
      setPhotosSerie(dataPhotosSerie.data.posters);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadKeywordsSerie() {
    try {
      const dataKeywordsSerie = await axios.get(keywordsSerieUrl);
      console.log("keywordsSerie ", dataKeywordsSerie);
      setKeywordsSerie(dataKeywordsSerie.data.results);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  function toggleTabs(event) {
    $(".active").removeClass("active");
    $(event.target).addClass("active");
    $(event.target)
      .attr("aria-selected", true)
      .siblings()
      .attr("aria-selected", false);
    event.target.id === "nav-photos-tab"
      ? $("#nav-photos").show()
      : $("#nav-photos").hide();
    $("body")
      .find(`[aria-labelledby="${event.target.id}"`)
      .addClass("show active")
      .siblings()
      .removeClass("show active");
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="movies">
          {pending ? (
            <Spinner />
          ) : (
            <div
              className="row detail-film"
              key={serieDetail && serieDetail.id}
              style={{ width: "100%" }}
            >
              <div className="col s12 detail-film-poster">
                <h2>{serieDetail && serieDetail.title}</h2>
              </div>
              <div className="col s12 m4">
                <img
                  src={`http://image.tmdb.org/t/p/w500${serieDetail &&
                    serieDetail.poster_path}`}
                  style={{ width: "100%" }}
                  className="card-img-top"
                  alt={`Poster de la série ${serieDetail && serieDetail.title}`}
                />
                <StarRatingComponent
                  name="rate1"
                  starCount={10}
                  value={serieDetail && serieDetail.vote_average}
                />
                <p className="film-detail">
                  Titre original
                  <span>{serieDetail && serieDetail.original_name}</span>
                </p>
                <p className="film-detail">
                  Genres
                  <span>
                    {serieDetail &&
                      serieDetail.genres.map((genre, index) => (
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
                  Nombre de saisons
                  <span>
                    {serieDetail && serieDetail.number_of_seasons && (
                      <p className="no-margin-bottom text-capitalize">
                        {serieDetail.number_of_seasons}
                      </p>
                    )}
                  </span>
                </p>
                <p className="film-detail">
                  Nombre d'épisodes
                  <span>
                    {serieDetail && serieDetail.number_of_episodes && (
                      <p className="no-margin-bottom text-capitalize">
                        {serieDetail.number_of_episodes}
                      </p>
                    )}
                  </span>
                </p>
                <p className="film-detail">
                  Première diffusion
                  <span>
                    {moment(serieDetail && serieDetail.first_air_date).format(
                      "DD/MM/YYYY"
                    )}
                  </span>
                </p>
                <p className="film-detail">
                  Dernière diffusion
                  <span>
                    {moment(serieDetail && serieDetail.last_air_date).format(
                      "DD/MM/YYYY"
                    )}
                  </span>
                </p>
                <p className="film-detail film-detail-duree">
                  Durée d'un épisode
                  <span>
                    {serieDetail && serieDetail.episode_run_time} minutes
                  </span>
                </p>
                <p className="film-detail">
                  Production
                  <span>
                    {serieDetail &&
                      serieDetail.production_companies.map((company, index) => (
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
                      ))}
                  </span>
                </p>
                <p className="film-detail">
                  Pays de production
                  <span>
                    {serieDetail && serieDetail.origin_country && (
                      <Flag
                        code={serieDetail.origin_country[0]}
                        className="film-production-flag"
                      />
                    )}
                  </span>
                </p>
                <p className="film-detail">
                  Mots-clés
                  <span>
                    <div className="film-detail-keywords">
                      {keywordsSerie &&
                        keywordsSerie.map(keyword => (
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
                          {serieDetail && serieDetail.vote_average}
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
                          {serieDetail && serieDetail.vote_count}
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
                          {serieDetail && serieDetail.popularity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <br />
                  {serieDetail.overview !== "" ? (
                    <p className="film-detail">
                      Synopsis
                      <span>{serieDetail && serieDetail.overview}</span>
                    </p>
                  ) : (
                    ""
                  )}
                  {castSerie && castSerie.length > 0 && (
                    <Cast castFilm={castSerie} />
                  )}
                  {crewSerie && crewSerie.length > 0 && (
                    <Crew crewFilm={crewSerie} />
                  )}
                </div>
                {photosSerie && photosSerie.length > 0 && (
                  <Photos photosFilm={photosSerie} />
                )}
              </div>
            </div>
          )}
        </div>
        {similarSeries && similarSeries.length > 0 && (
          <div>
            <hr className="hr-detailfilm" />
            <div className="similar-films-title">
              <h3>Séries similaires</h3>
            </div>
            <div className="row similar-films">
              <ItemsCarousel
                gutter={10}
                activePosition={"center"}
                chevronWidth={10}
                numberOfCards={4}
                slidesToScroll={2}
                outsideChevron={true}
                showSlither={false}
                firstAndLastGutter={false}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={value => setActiveItemIndex(value)}
                rightChevron={<i className="fas fa-chevron-right"></i>}
                leftChevron={<i className="fas fa-chevron-left"></i>}
              >
                {similarSeries &&
                  similarSeries.map(serie => (
                    <div className="col s12 similar-film-detail" key={serie.id}>
                      <a
                        href={`/serie/${serie.id}`}
                        to={`/serie/${serie.id}`}
                        key={serie.id}
                      >
                        <img
                          src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`}
                          alt={`Poster de la série ${serie.title}`}
                        />
                        <br />
                        <p>{serie.original_name}</p>
                        <p>({serie.first_air_date.slice(0, 4)})</p>
                        <div className="col s12 similar-film-detail-rating">
                          <StarRatingComponent
                            name="rate1"
                            starCount={10}
                            value={serie.vote_average}
                          />
                        </div>
                      </a>
                    </div>
                  ))}
              </ItemsCarousel>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailSerie;
