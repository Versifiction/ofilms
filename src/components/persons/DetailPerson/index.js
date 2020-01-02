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
//import placeholder from '../../../images/placeholder.png';

function DetailPerson({ match }) {
  const [personDetail, setPersonDetail] = useState(false);
  const [castCreditsPerson, setCastCreditsPerson] = useState(false);
  const [crewCreditsPerson, setCrewCreditsPerson] = useState(false);
  const [photosPerson, setPhotosPerson] = useState(false);
  const [pending, setPending] = useState(true);
  const personDetailUrl = `https://api.themoviedb.org/3/person/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const castCreditsPersonUrl = `https://api.themoviedb.org/3/person/${match.params.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const photosPersonUrl = `https://api.themoviedb.org/3/person/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loadPersonDetail();
    loadCastCreditsPerson();
    loadCrewCreditsPerson();
    loadPhotosPerson();
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
        ? $("#nav-bandesannonces").show()
        : $("#nav-bandesannonces").hide();
      event.target.id === "nav-photos-tab"
        ? $("#nav-photos").show()
        : $("#nav-photos").hide();
      $("body")
        .find(`[aria-labelledby="${event.target.id}"`)
        .addClass("show active")
        .siblings()
        .removeClass("show active");
    });
    $(".sc-bxivhb").hover(function() {
      $(this).css("box-shadow", "grey 0 0 10px 2px");
    });

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadPersonDetail() {
    try {
      const dataPersonDetail = await axios.get(personDetailUrl);
      setPersonDetail(dataPersonDetail.data);
      setPending(false);
      document.title = `O'Films | ${dataPersonDetail.data.name}`;
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCastCreditsPerson() {
    try {
      const dataCastCreditsPerson = await axios.get(castCreditsPersonUrl);
      setCastCreditsPerson(dataCastCreditsPerson.data.cast);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCrewCreditsPerson() {
    try {
      const dataCrewCreditsPerson = await axios.get(castCreditsPersonUrl);
      setCrewCreditsPerson(dataCrewCreditsPerson.data.crew);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPhotosPerson() {
    try {
      const dataPhotosPerson = await axios.get(photosPersonUrl);
      setPhotosPerson(dataPhotosPerson.data.profiles);
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
        {pending ? (
          <Spinner />
        ) : (
          <>
            <div
              className="row detail-film"
              key={personDetail && personDetail.id}
            >
              <div className="col s12">
                <h2>{personDetail && personDetail.name}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m4 detail-film-poster">
                <img
                  src={
                    personDetail && personDetail.birthday !== null
                      ? `http://image.tmdb.org/t/p/w500${personDetail &&
                          personDetail.profile_path}`
                      : "https://via.placeholder.com/300x400/2C2F33/FFFFFF/png?text=Image+non+disponible"
                  }
                  style={{ width: "100%" }}
                  className="card-img-top"
                  alt={`Poster de ${personDetail && personDetail.name}`}
                />

                {personDetail && personDetail.length > 0 && (
                  <p className="film-detail film-detail-duree">
                    Connu également en tant que
                    <span>
                      {personDetail &&
                        personDetail.also_known_as.map(name => <p>{name}</p>)}
                    </span>
                  </p>
                )}
                <p className="film-detail film-detail-duree">
                  Profession
                  <span>
                    {personDetail && personDetail.known_for_department}
                  </span>
                </p>
                {personDetail && personDetail.birthday !== null && (
                  <p className="film-detail">
                    Date de naissance
                    <span>
                      {moment(personDetail && personDetail.birthday).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </p>
                )}
                {personDetail && personDetail.place_of_birth !== null && (
                  <p className="film-detail film-detail-duree">
                    Lieu de naissance
                    <span>{personDetail && personDetail.place_of_birth}</span>
                  </p>
                )}
                {personDetail.deathday && (
                  <p className="film-detail">
                    Date de décès
                    <span>
                      {moment(personDetail && personDetail.deathday).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </p>
                )}
                {personDetail && personDetail.biography && (
                  <p className="film-detail">
                    Biographie
                    <span>
                      <div className="film-detail-keywords">
                        {personDetail && personDetail.biography}
                      </div>
                    </span>
                  </p>
                )}
                {personDetail && personDetail.homepage && (
                  <p className="film-detail">
                    Homepage
                    <span>
                      <div className="film-detail-keywords">
                        <a href={personDetail.homepage}>
                          {personDetail && personDetail.homepage}
                        </a>
                      </div>
                    </span>
                  </p>
                )}
              </div>
              <div className="col s12 m8">
                <ul
                  className="nav nav-tabs detail-film-videos"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    onClick={toggleTabs}
                    id="nav-credits-tab"
                    data-toggle="tab"
                    href="#nav-credits"
                    role="tab"
                    aria-controls="nav-credits"
                    aria-selected="true"
                  >
                    Crédits
                  </a>
                  {photosPerson && photosPerson.length > 0 && (
                    <a
                      className="nav-item nav-link"
                      onClick={toggleTabs}
                      id="nav-photos-tab"
                      data-toggle="tab"
                      href="#nav-photos"
                      role="tab"
                      aria-controls="nav-photos"
                      aria-selected="false"
                    >
                      Photos
                    </a>
                  )}
                </ul>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-credits"
                    role="tabpanel"
                    aria-labelledby="nav-credits-tab"
                  >
                    <div className="card-body">
                      <p className="film-detail">
                        Casting
                        <span>
                          <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                            {castCreditsPerson &&
                              castCreditsPerson.map(credit => (
                                <div key={credit.id} className="card">
                                  <Link
                                    href={`/film/${credit.id}`}
                                    to={`/film/${credit.id}`}
                                  >
                                    <img
                                      src={
                                        credit.poster_path == null
                                          ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                          : `http://image.tmdb.org/t/p/w500${credit.poster_path}`
                                      }
                                      className="card-img-top"
                                      alt={credit.name}
                                    />
                                  </Link>
                                  <br />
                                  <p className="film-detail-cast-name">
                                    {!credit.title ? credit.name : credit.title}
                                  </p>
                                  <p className="film-detail-cast-character">
                                    {credit.character === ""
                                      ? "-"
                                      : credit.character}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </span>
                      </p>
                      <p className="film-detail">
                        Crew
                        <span>
                          <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                            {crewCreditsPerson &&
                              crewCreditsPerson.map(crew => (
                                <div key={crew.id} className="card">
                                  <Link
                                    href={`/film/${crew.id}`}
                                    to={`/film/${crew.id}`}
                                  >
                                    <img
                                      src={
                                        crew.poster_path == null
                                          ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                          : `http://image.tmdb.org/t/p/w500${crew.poster_path}`
                                      }
                                      className="card-img-top"
                                      alt={crew.name}
                                    />
                                  </Link>
                                  <br />
                                  <p className="film-detail-cast-name">
                                    {crew.title === "" ? crew.name : crew.title}
                                  </p>
                                  <p className="film-detail-cast-character">
                                    {crew.job === "" ? "-" : crew.job}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </span>
                      </p>
                    </div>
                  </div>
                  {photosPerson && photosPerson.length > 0 && (
                    <div
                      className="tab-pane fade"
                      id="nav-photos"
                      role="tabpanel"
                      aria-labelledby="nav-photos-tab"
                    >
                      <div className="film-detail-photos">
                        {photosPerson &&
                          photosPerson.map((photo, index) => (
                            <img
                              key={index}
                              src={`http://image.tmdb.org/t/p/w500${photo.file_path}`}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DetailPerson;
