import React, { useEffect, useState } from "react";
import M from "materialize-css";
import axios from "axios";
import useForceUpdate from "use-force-update";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import $ from "jquery";

import "../../App.css";

import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Bibliotheque() {
  const [moviesGenres, setMoviesGenres] = useState(false);
  const [tvGenres, setTvGenres] = useState(false);
  const [result, setResult] = useState(false);
  const [mediaType, setMediaType] = useState("movie");
  const [nameGenreChosen, setNameGenreChosen] = useState("Action");
  const [idGenreChosen, setIdGenreChosen] = useState(28);
  const [pending, setPending] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const forceUpdate = useForceUpdate();
  const moviesGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const searchUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&with_genres=${idGenreChosen}&page=${activePage}`;
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    window.scroll(0, 0);
    M.AutoInit();

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, [activePage]);

  useEffect(() => {
    document.title = "O'Films | Bibliothèque";
  });

  useEffect(() => {
    loadMoviesGenres();
    loadTvGenres();
  }, []);

  useEffect(() => {
    search();
  }, [mediaType, idGenreChosen, searchUrl]);

  async function loadMoviesGenres() {
    try {
      const dataMoviesGenres = await axios.get(moviesGenresUrl);
      setMoviesGenres(dataMoviesGenres.data.genres);
      setPending(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadTvGenres() {
    try {
      const dataTvGenres = await axios.get(tvGenresUrl);
      setTvGenres(dataTvGenres.data.genres);
      setPending(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function search() {
    try {
      const dataMovies = await axios.get(searchUrl);
      setResult(dataMovies.data.results);
      setTotalPages(dataMovies.data.total_pages);
      setPending(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleMediaTypeChange(e) {
    setMediaType(e.target.value);
    forceUpdate();
  }

  function handleGenreChange(e) {
    setNameGenreChosen(
      $(".selected:eq(1)")
        .children("span")
        .text()
    );
    setIdGenreChosen(
      mediaType === "movie"
        ? moviesGenres.find(genre => genre.name === e.target.value).id
        : tvGenres.find(genre => genre.name === e.target.value).id
    );
    forceUpdate();
  }

  function handlePageChange() {
    setInterval(() => {
      setActivePage($("li.active").text());
      forceUpdate();
    }, 500);
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2>Bibliothèque</h2>
        <div className="row">
          <div className="col s12">
            <h5 style={{ color: "#95878b" }}>
              Trouvez vos films et vos séries préférées grâce à un filtrage par
              catégories
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <p>Choisissez un type de fiction</p>
            <select style={{ zIndex: "999" }} onChange={handleMediaTypeChange}>
              <option value="" disabled defaultValue>
                Choisissez votre type de fiction
              </option>
              <option value="movie">Films</option>
              <option value="tv">Séries</option>
            </select>
          </div>

          <div className="input-field col s6">
            <p>Choisissez un genre</p>
            {mediaType === "movie" ? (
              <select onChange={handleGenreChange}>
                <option value="" disabled defaultValue>
                  Choisissez un genre
                </option>
                {moviesGenres &&
                  moviesGenres.map(genre => (
                    <option value={genre.name} key={genre.id} id={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>
            ) : (
              <select onChange={handleGenreChange}>
                <option value="" disabled defaultValue>
                  Choisissez un genre
                </option>
                {tvGenres &&
                  tvGenres.map(genre => (
                    <option value={genre.name} key={genre.id} id={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
        <br />
        <h4 style={{ color: "white" }}>Résultats</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "inherit"
          }}
          className="film-types-datas"
        >
          {result &&
            result.map(media => (
              <Link
                href={`/${mediaType === "movie" ? "film" : "serie"}/${
                  media.id
                }`}
                to={`/${mediaType === "movie" ? "film" : "serie"}/${media.id}`}
                key={media.id}
                style={{
                  textDecoration: "none",
                  width: "20%",
                  padding: "10px",
                  marginBottom: "50px",
                  height: "300px"
                }}
              >
                <div className="row film-encart">
                  <img
                    src={
                      media.poster_path !== null
                        ? `http://image.tmdb.org/t/p/w500${media.poster_path}`
                        : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                    }
                    className="card-img-top"
                    alt={`Poster de ${
                      mediaType === "movie" ? media.title : media.original_name
                    }`}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <br />
                  <div className="card-body">
                    <p
                      className="card-title"
                      style={{
                        fontSize: "1.25rem",
                        textTransform: "uppercase",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {mediaType === "movie"
                        ? media && media.title
                        : media && media.original_name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
      >
        <ReactPaginate
          previousLabel={<i className="material-icons">chevron_left</i>}
          nextLabel={<i className="material-icons">chevron_right</i>}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Bibliotheque;
