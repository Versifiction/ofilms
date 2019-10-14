/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Link } from "react-router-dom";

function Crew({ crewFilm }) {
  return (
    <p className="film-detail">
      Crew
      <span>
        <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
          {crewFilm &&
            crewFilm.map(crew => (
              <div key={crew.id} className="card">
                <Link href={`/person/${crew.id}`} to={`/person/${crew.id}`}>
                  <img
                    src={
                      crew.profile_path == null
                        ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                        : `http://image.tmdb.org/t/p/w500${crew.profile_path}`
                    }
                    className="card-img-top"
                    alt={crew.name}
                    style={{ width: "100%" }}
                  />
                </Link>
                <br />
                <p className="film-detail-cast-name">{crew.name}</p>
                <p className="film-detail-cast-character">
                  {crew.job === "" ? "-" : crew.job}
                </p>
              </div>
            ))}
        </div>
      </span>
    </p>
  );
}

export default Crew;
