/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

function BandesAnnonces({ videosFilm }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <div id="test2" className="col s12">
      {videosFilm && videosFilm.length > 0 && (
        <p className="film-detail">
          Bandes-annonces
          <p className="card-text">
            <ItemsCarousel
              gutter={10}
              activePosition={"center"}
              chevronWidth={10}
              numberOfCards={1}
              slidesToScroll={2}
              outsideChevron={true}
              showSlither={false}
              firstAndLastGutter={false}
              activeItemIndex={activeItemIndex}
              requestToChangeActive={value => setActiveItemIndex(value)}
              rightChevron={<i className="fas fa-chevron-right"></i>}
              leftChevron={<i className="fas fa-chevron-left"></i>}
            >
              {videosFilm &&
                videosFilm.map((video, index) => (
                  <div key={index}>
                    <iframe
                      src={`http://www.youtube.com/embed/${video.key}`}
                      width="95%"
                      height="300px"
                      allowFullScreen
                      style={{
                        margin: "0 auto",
                        display: "block"
                      }}
                    ></iframe>
                  </div>
                ))}
            </ItemsCarousel>
          </p>
        </p>
      )}
    </div>
  );
}

export default BandesAnnonces;
