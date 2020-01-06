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
import PlaceholderTwo from "../../components/Molecules/Placeholders/PlaceholderTwo";

function Bibliotheque() {
  // const [moviesGenres, setMoviesGenres] = useState(false);
  // const [tvGenres, setTvGenres] = useState(false);
  const [genres, setGenres] = useState(false);
  const [result, setResult] = useState(false);
  // const [mediaType, setMediaType] = useState("movie");
  const [nameGenreChosen, setNameGenreChosen] = useState("Action");
  const [idGenreChosen, setIdGenreChosen] = useState(28);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const forceUpdate = useForceUpdate();
  const moviesGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  // const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
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
    // console.log("mediaType ", mediaType);
    // console.log("idGenreChosen ", idGenreChosen);
    // loadMoviesGenres();
    // loadTvGenres();
    search();
  }, [idGenreChosen]);

  useEffect(() => {
    // console.log("---");
    // console.log("genres ", genres);
  }, [genres]);

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadGenres() {
    try {
      const dataMoviesGenres = await axios.get(moviesGenresUrl);
      setGenres(dataMoviesGenres.data.genres);
      setPending(false);
    } catch (error) {
      console.error(error);
    }
  }

  // async function loadMoviesGenres() {
  //   try {
  //     const dataMoviesGenres = await axios.get(moviesGenresUrl);
  //     setMoviesGenres(dataMoviesGenres.data.genres);
  //     setPending(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function loadTvGenres() {
  //   try {
  //     const dataTvGenres = await axios.get(tvGenresUrl);
  //     setTvGenres(dataTvGenres.data.genres);
  //     setPending(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function search() {
    console.log("search---");
    try {
      setPending(true);
      const dataGenres = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&with_genres=${idGenreChosen}&page=${activePage}`
      );
      console.log(
        "searchUrl ",
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&with_genres=${idGenreChosen}&page=${activePage}`
      );
      setResult(dataGenres.data.results);
      setTotalPages(dataGenres.data.total_pages);
      setPending(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGenreChange(e) {
    setPending(true);
    setNameGenreChosen(
      $(".selected:eq(1)")
        .children("span")
        .text()
    );
    setIdGenreChosen(genres.find(genre => genre.name === e.target.value).id);

    try {
      const dataGenres = await axios.get(moviesGenresUrl);
      setGenres(dataGenres.data.genres);
      setPending(false);
    } catch (error) {
      console.error(error);
    }

    // search();
  }

  function handlePageChange() {
    setActivePage($("li.active").text());
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2>Bibliothèque</h2>

        <div className="row">
          <div className="col s12">
            <h5 style={{ color: "#95878b" }}>
              Trouvez vos films préférées grâce à un filtrage par catégories
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <p>Choisissez un genre</p>
            <select onChange={handleGenreChange}>
              <option value="" disabled defaultValue>
                Choisissez un genre
              </option>
              {genres &&
                genres.map(genre => (
                  <option value={genre.name} key={genre.id} id={genre.id}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col s12">
            <h4 style={{ color: "white" }}>Résultats</h4>
          </div>
        </div>
        {pending ? (
          <PlaceholderTwo />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "inherit"
              }}
              className="row film-types-datas"
            >
              {result &&
                result.map((media, index) => (
                  <Link
                    href={`/${"film"}/${media.id}`}
                    to={`/${"film"}/${media.id}`}
                    key={media.id}
                    className="col s6 m3"
                    style={{
                      textDecoration: "none",
                      height: "300px",
                      paddingRight: "10px",
                      marginTop: "20px",
                      marginBottom: "20px"
                    }}
                  >
                    <div className="film-encart">
                      <img
                        src={
                          media.poster_path !== null
                            ? `http://image.tmdb.org/t/p/w500${media.poster_path}`
                            : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                        }
                        className="card-img-top"
                        alt={`Poster de ${media.title}`}
                        title={media.title}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <br />
                      <div className="card-body">
                        <p
                          className="film-types-title"
                          // style={{
                          //   fontSize: "1.25rem",
                          //   textTransform: "uppercase",
                          //   textOverflow: "ellipsis",
                          //   overflow: "hidden",
                          //   whiteSpace: "nowrap"
                          // }}
                        >
                          {media && media.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        )}
      </div>
      {totalPages !== 0 && (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            marginTop: "50px"
          }}
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
      )}
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default Bibliotheque;
