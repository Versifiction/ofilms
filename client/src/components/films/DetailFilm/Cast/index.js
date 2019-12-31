/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Link } from "react-router-dom";

function Cast({ castFilm }) {
  return (
    <p className="film-detail">
      Casting
      <span>
        <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
          {castFilm &&
            castFilm.map(cast => (
              <div key={cast.id} className="card">
                <Link href={`/person/${cast.id}`} to={`/person/${cast.id}`}>
                  <img
                    src={
                      cast.profile_path == null
                        ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                        : `http://image.tmdb.org/t/p/w500${cast.profile_path}`
                    }
                    className="card-img-top"
                    alt={cast.name}
                    style={{ width: "100%" }}
                  />
                </Link>
                <br />
                <p className="film-detail-cast-name">{cast.name}</p>
                <p className="film-detail-cast-character">
                  {cast.character === "" ? "-" : cast.character}
                </p>
              </div>
            ))}
        </div>
      </span>
    </p>
  );
}

export default Cast;
