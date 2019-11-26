/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import useForceUpdate from "use-force-update";
import ReactPaginate from "react-paginate";
import $ from "jquery";

import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";

function BestRatedSeries() {
  const [bestRatedSeries, setBestRatedSeries] = useState(false);
  const [allGenres, setAllGenres] = useState(false);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const bestRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const allGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const forceUpdate = useForceUpdate();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    document.title = `O'Films | Les séries les mieux notées`;
    loadBestRatedSeries();
    loadAllGenres();
    window.scroll(0, 0);

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, [activePage]);

  async function loadBestRatedSeries() {
    try {
      const dataBestRatedSeries = await axios.get(bestRatedSeriesUrl);
      console.log("bestRatedSeries ", dataBestRatedSeries);
      setBestRatedSeries(dataBestRatedSeries.data.results);
      setTotalPages(dataBestRatedSeries.data.total_pages);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadAllGenres() {
    try {
      const dataAllGenres = await axios.get(allGenresUrl);
      console.log("allgenres ", dataAllGenres);
      setAllGenres(dataAllGenres.data.genres);
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
            marginBottom: "30px"
          }}
        >
          Les séries les mieux notées
        </h2>
        <div
          className="movies"
          style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}
        >
          {pending ? (
            <Spinner />
          ) : (
            bestRatedSeries &&
            bestRatedSeries.map((serie, index) => (
              <Link
                href={`/serie/${serie.id}`}
                to={`/serie/${serie.id}`}
                key={serie.id}
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
                      src={
                        serie.poster_path == null
                          ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                          : `http://image.tmdb.org/t/p/w500${serie.poster_path}`
                      }
                      className="card-img-top"
                      alt={`Poster de la série ${serie.original_name}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col s12 m8">
                    <div className="card-body">
                      <p
                        className="card-title"
                        style={{
                          fontSize: "26px",
                          textTransform: "uppercase",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {serie && serie.original_name}
                      </p>
                      <StarRatingComponent
                        name="rate1"
                        starCount={10}
                        value={serie && serie.vote_average}
                      />
                      <span
                        style={{
                          fontSize: "14px",
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
                          &nbsp;{serie && serie.genre_ids}
                          {/* {serie &&
                            serie.genre_ids.map(genre => (
                              <p
                                style={{
                                  display: "inline-block",
                                  marginRight: "4px"
                                }}
                              >
                                {allGenres &&
                                  allGenres.find(g => g.id === genre).name}
                              </p>
                            ))} */}
                        </span>
                      </span>
                      <p className="card-text">
                        <span
                          style={{
                            color: "#0CD0FC",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          Synopsis
                        </span>
                        &nbsp;{serie && serie.overview.substring(0, 200)}...
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

export default BestRatedSeries;
