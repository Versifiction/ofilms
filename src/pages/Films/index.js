import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useForceUpdate from "use-force-update";

import "../../App.css";
import Nav from "../../components/Nav";
import Spinner from "../../components/Molecules/Spinner";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Films() {
  const [afficheFilms, setAfficheFilms] = useState([]);
  const [tendancesFilms, setTendancesFilms] = useState([]);
  const [bestRatedFilms, setBestRatedFilms] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [timeValue, setTimeValue] = useState("week");
  const [pending, setPending] = useState(true);
  const afficheFilmsUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const tendancesFilmsUrl = `https://api.themoviedb.org/3/trending/movies/${timeValue}?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const bestRatedFilmsUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    document.title = "O'Films | Films";
    loadAfficheFilms();
    loadTendancesFilms();
    loadBestRatedFilms();

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadAfficheFilms() {
    try {
      const dataAfficheFilms = await axios.get(afficheFilmsUrl);
      setAfficheFilms(dataAfficheFilms.data.results);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadTendancesFilms() {
    try {
      const dataTendancesFilms = await axios.get(tendancesFilmsUrl);
      setTendancesFilms(dataTendancesFilms.data.results);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadBestRatedFilms() {
    try {
      const dataBestRatedFilms = await axios.get(bestRatedFilmsUrl);
      setBestRatedFilms(dataBestRatedFilms.data.results);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Films</h2>
      <div className="container">
        <div className="film-types">
          <h4 className="film-types-title">
            Les films à l'affiche
            <p className="film-types-suite">
              <Link href="/films/affiche" to="/films/affiche">
                Voir plus
              </Link>
            </p>
          </h4>
          {pending ? (
            <Spinner />
          ) : (
            <>
              <div className="film-types-datas scrolling-wrapper">
                {afficheFilms &&
                  afficheFilms.map((film, index) => (
                    <Link
                      href={`/film/${film.id}`}
                      to={`/film/${film.id}`}
                      key={film.id}
                      className={`text-decoration-none card ${
                        index !== 0 ? "film-types-container" : ""
                      }`}
                    >
                      <img
                        src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={`Poster du film ${film.title}`}
                        className={`${
                          index !== 0
                            ? "film-types-img"
                            : "film-types-img-first"
                        }`}
                      />
                      <p className="film-types-title">{film.title}</p>
                    </Link>
                  ))}
              </div>
              <hr className="hr-accueil" />
            </>
          )}
        </div>
        <div className="film-types">
          <h4 className="film-types-title">
            Les films en tendances
            <p className="film-types-suite">
              <Link href="/films/tendances" to="/films/tendances">
                Voir plus
              </Link>
            </p>
          </h4>
          {pending ? (
            <Spinner />
          ) : (
            <>
              <div className="film-types-datas scrolling-wrapper">
                {tendancesFilms &&
                  tendancesFilms.map((film, index) => (
                    <Link
                      href={`/film/${film.id}`}
                      to={`/film/${film.id}`}
                      key={film.id}
                      className={`text-decoration-none card ${
                        index !== 0 ? "film-types-container" : ""
                      }`}
                    >
                      <img
                        src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={`Poster du film ${film.title}`}
                        className={`${
                          index !== 0
                            ? "film-types-img"
                            : "film-types-img-first"
                        }`}
                      />
                      <p className="film-types-title">
                        {!film.title ? film.name : film.title}
                      </p>
                    </Link>
                  ))}
              </div>
              <hr className="hr-accueil" />
            </>
          )}
        </div>
        <div className="film-types">
          <h4 className="film-types-title">
            Les films les mieux notés
            <p className="film-types-suite">
              <Link href="/films/mieux-notes" to="/films/mieux-notes">
                Voir plus
              </Link>
            </p>
          </h4>
          {pending ? (
            <Spinner />
          ) : (
            <>
              <div className="film-types-datas scrolling-wrapper">
                {bestRatedFilms &&
                  bestRatedFilms.map((film, index) => (
                    <Link
                      href={`/film/${film.id}`}
                      to={`/film/${film.id}`}
                      key={film.id}
                      className={`text-decoration-none card ${
                        index !== 0 ? "film-types-container" : ""
                      }`}
                    >
                      <img
                        src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={`Poster du film ${film.title}`}
                        className={`${
                          index !== 0
                            ? "film-types-img"
                            : "film-types-img-first"
                        }`}
                      />
                      <p className="film-types-title">{film && film.title}</p>
                      <p className="film-types-date">
                        {film && film.release_date.slice(0, 4)}
                      </p>
                    </Link>
                  ))}
              </div>
              <hr className="hr-accueil" />
            </>
          )}
        </div>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Films;
