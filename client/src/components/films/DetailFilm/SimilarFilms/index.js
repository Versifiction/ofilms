/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import StarRatingComponent from "react-star-rating-component";

function SimilarFilms({ similarFilms }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <>
      {similarFilms && similarFilms.length > 0 && (
        <div>
          <hr className="hr-detailfilm" />
          <div className="similar-films-title">
            <h3>Films similaires</h3>
          </div>
          <div className="row similar-films">
            <ItemsCarousel
              gutter={10}
              activePosition={"center"}
              chevronWidth={10}
              numberOfCards={4}
              slidesToScroll={1}
              outsideChevron={true}
              showSlither={false}
              firstAndLastGutter={false}
              activeItemIndex={activeItemIndex}
              requestToChangeActive={value => setActiveItemIndex(value)}
              rightChevron={<i className="fas fa-chevron-right"></i>}
              leftChevron={<i className="fas fa-chevron-left"></i>}
            >
              {similarFilms &&
                similarFilms.map(film => (
                  <div className="col s12 similar-film-detail" key={film.id}>
                    <a
                      href={`/film/${film.id}`}
                      to={`/film/${film.id}`}
                      key={film.id}
                    >
                      <img
                        src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={`Poster du film ${film.title}`}
                      />
                      <br />
                      <p>{film.title}</p>
                      <p>({film.release_date.slice(0, 4)})</p>
                      <div className="col s12 similar-film-detail-rating">
                        <StarRatingComponent
                          name="rate1"
                          starCount={10}
                          value={film.vote_average}
                        />
                      </div>
                    </a>
                  </div>
                ))}
            </ItemsCarousel>
          </div>
        </div>
      )}
    </>
  );
}

export default SimilarFilms;
