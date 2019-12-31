import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import useForceUpdate from "use-force-update";
import ReactPaginate from "react-paginate";
import $ from "jquery";

import Nav from "../Nav";
import Spinner from "../Molecules/Spinner";

function Keyword({ match }) {
  const [keyword, setKeyword] = useState(false);
  const [keywordName, setKeywordName] = useState(false);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [allGenres, setAllGenres] = useState(false);
  const keywordUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}/movies?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const keywordNameUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const allGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const forceUpdate = useForceUpdate();
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadKeyword();
    loadKeywordName();
    loadAllGenres();

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadKeyword() {
    try {
      const dataKeyword = await axios.get(keywordUrl);
      console.log("keyword ", dataKeyword);
      setKeyword(dataKeyword.data.results);
      setTotalPages(dataKeyword.data.total_pages);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadAllGenres() {
    try {
      const dataAllGenres = await axios.get(allGenresUrl);
      console.log("data ", dataAllGenres);
      setAllGenres(dataAllGenres.data.genres);
      console.log("allgenres ", allGenres);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadKeywordName() {
    try {
      const dataKeywordName = await axios.get(keywordNameUrl);
      console.log("keywordName ", dataKeywordName);
      setKeywordName(dataKeywordName.data.name);
      document.title = `O'Films | ${dataKeywordName.data.name}`;
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  function handlePageChange() {
    setInterval(() => {
      setActivePage($("li.active").text());
      forceUpdate();
    }, 100);
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            color: "#95878B",
            marginBottom: "30px"
          }}
        >
          Liste de fictions avec le mot clé "{keywordName}"
        </h2>
        <div
          className="movies"
          style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}
        >
          {pending ? (
            <Spinner />
          ) : (
            keyword &&
            keyword.map((film, index) => (
              <Link
                href={`/film/${film.id}`}
                to={`/film/${film.id}`}
                key={film.id}
                style={{
                  textDecoration: "none",
                  width: "50%",
                  padding: "10px",
                  height: "300px"
                }}
              >
                <div
                  className="row"
                  style={{
                    marginBottom: "10px",
                    padding: "20px",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <div className="col s12 m4" style={{ padding: "20px" }}>
                    <img
                      src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                      className="card-img-top"
                      alt={`Poster du film ${film.title}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col s12 m8">
                    <div className="card-body">
                      <p
                        className="card-title"
                        style={{
                          fontSize: "1.625rem",
                          textTransform: "uppercase",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {film && film.title}
                      </p>
                      <StarRatingComponent
                        name="rate1"
                        starCount={10}
                        value={film && film.vote_average}
                      />
                      <span
                        style={{
                          fontSize: "0.875rem",
                          marginBottom: "0",
                          color: "#0CD0FC",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          display: "block"
                        }}
                      >
                        Genres
                        <span
                          style={{ color: "#95878b", fontWeight: "initial" }}
                        >
                          &nbsp;
                          {film &&
                            film.genre_ids.map(genre => (
                              <p
                                style={{
                                  display: "inline-block",
                                  marginRight: "4px"
                                }}
                              >
                                {allGenres &&
                                  allGenres.find(g => g.id === genre).name}
                              </p>
                            ))}
                        </span>
                      </span>
                      <p className="card-text">
                        <span
                          style={{
                            color: "#0CD0FC",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: "0.875rem"
                          }}
                        >
                          Synopsis
                        </span>
                        &nbsp;{film && film.overview.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
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
    </>
  );
}

export default Keyword;
