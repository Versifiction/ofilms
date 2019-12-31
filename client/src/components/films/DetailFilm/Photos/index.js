/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";

function Photos({ photosFilm }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    console.log(document.getElementsByClassName("sc-bwzfXH")[0]);
    // document.getElementsByClassName("sc-bwzfXH")[0].style.height = "400px";
    // document.getElementsByClassName("sc-htpNat")[0].style.height = "400px";
  }, []);

  return (
    <>
      <div id="test3" className="col s12">
        {photosFilm && photosFilm.length > 0 && (
          <p className="film-detail">
            Photos
            <p className="card-text">
              <ItemsCarousel
                gutter={10}
                activePosition={"center"}
                chevronWidth={10}
                numberOfCards={1}
                slidesToScroll={1}
                outsideChevron={true}
                showSlither={false}
                firstAndLastGutter={false}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={value => setActiveItemIndex(value)}
                rightChevron={<i className="fas fa-chevron-right"></i>}
                leftChevron={<i className="fas fa-chevron-left"></i>}
              >
                {photosFilm &&
                  photosFilm.map((photo, index) => (
                    <img
                      key={index}
                      src={`http://image.tmdb.org/t/p/w500${photo.file_path}`}
                      style={{
                        margin: "0 auto",
                        display: "block",
                        height: "400px"
                      }}
                    />
                  ))}
              </ItemsCarousel>
            </p>
          </p>
        )}
      </div>
    </>
  );
}

export default Photos;
