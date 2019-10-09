import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import useForceUpdate from "use-force-update";

//import { genres } from '../../utils/genres';
import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";
import Pagination from "../../Molecules/Pagination";

function TendancesFilms() {
  const [tendancesFilms, setTendancesFilms] = useState(false);
  const [allGenres, setAllGenres] = useState(false);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [timeValue, setTimeValue] = useState("week");
  const tendancesFilmsUrl = `https://api.themoviedb.org/3/trending/movies/${timeValue}?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const allGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const forceUpdate = useForceUpdate();
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const goToPage = val => setActivePage(val);
  const getFirst = () => setActivePage(1);
  const getPrevious = () =>
    activePage > 1 ? setActivePage(activePage - 1) : "";
  const getNext = () =>
    activePage < totalPages ? setActivePage(activePage + 1) : "";
  const getLast = () => setActivePage(totalPages);

  useEffect(() => {
    document.title = `O'Films | Les films en tendances`;
    loadTendancesFilms();
    loadAllGenres();
    window.scroll(0, 0);

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, [activePage]);

  async function loadTendancesFilms() {
    try {
      const dataTendancesFilms = await axios.get(tendancesFilmsUrl);
      console.log("tendancesFilms ", dataTendancesFilms);
      setTendancesFilms(dataTendancesFilms.data.results);
      setTotalPages(dataTendancesFilms.data.total_pages);
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

  return (
    <>
      <Nav />
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px"
          }}
        >
          Les films en tendances
        </h2>
        <div
          className="movies"
          style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}
        >
          {pending ? (
            <Spinner />
          ) : (
            tendancesFilms &&
            tendancesFilms.map((film, index) => (
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
                          fontSize: "26px",
                          textTransform: "uppercase",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {film && film.title}
                      </p>
                      <div style={{ display: "flex" }}>
                        <StarRatingComponent
                          name="rate1"
                          starCount={10}
                          value={film && film.vote_average}
                        />
                        <span
                          style={{
                            color: "rgb(255, 180, 0)",
                            marginLeft: "6px"
                          }}
                        >
                          {film && film.vote_average}
                        </span>
                        /10
                      </div>
                      <span className="genres">
                        Genres
                        <span
                          style={{
                            color: "#95878b",
                            fontWeight: "initial",
                            marginLeft: "6px"
                          }}
                        >
                          {film && film.genre_ids}
                          {/* {film &&
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
      <div className="container">
        <Pagination
          getFirst={getFirst}
          getPrevious={getPrevious}
          getNext={getNext}
          getLast={getLast}
          goToPage={goToPage}
          activePage={activePage}
          setActivePage={setActivePage}
          total={totalPages}
        />
      </div>
    </>
  );
}

export default TendancesFilms;
