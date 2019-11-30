/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-expressions */
test 1
<div id="test1" className="col s12">
  <div className="row">
    <div className="col s12 col m4">
      <div
        className="content"
        style={{
          textAlign: "center",
          margin: "inherit",
          padding: "20px"
        }}
      >
        <p>Note moyenne</p>
        <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {filmDetail && filmDetail.vote_average}
        </p>
      </div>
    </div>
    <div className="col s12 col m4">
      <div
        className="content"
        style={{
          textAlign: "center",
          margin: "inherit",
          padding: "20px"
        }}
      >
        <p>Nombre de votes</p>
        <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {filmDetail && filmDetail.vote_count}
        </p>
      </div>
    </div>
    <div className="col s12 col m4">
      <div
        className="content"
        style={{
          textAlign: "center",
          margin: "inherit",
          padding: "20px"
        }}
      >
        <p>Popularité</p>
        <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          {filmDetail && filmDetail.popularity}
        </p>
      </div>
    </div>
  </div>
  <br />
  <p className="film-detail">
    Synopsis
    <span>{filmDetail && filmDetail.overview}</span>
  </p>
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
</div>

test2
<div id="test2" className="col s12">
                      {videosFilm && videosFilm.length > 0 && (
                        <p className="card-text">
                          <div>
                            {seeAllVideos
                              ? videosFilm &&
                                videosFilm.slice(0, 8).map((video, index) => (
                                  <div key={index}>
                                    <iframe
                                      src={`http://www.youtube.com/embed/${video.key}`}
                                      width="100%"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ))
                              : videosFilm &&
                                videosFilm.slice(0, 4).map((video, index) => (
                                  <div key={index}>
                                    <iframe
                                      src={`http://www.youtube.com/embed/${video.key}`}
                                      width="100%"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                ))}
                            {!seeAllVideos && videosFilm.length > 4 && (
                              <p onClick={() => setSeeAllVideos(!seeAllVideos)}>
                                Voir plus de vidéos
                              </p>
                            )}
                          </div>
                        </p>
                      )}
                    </div>


test3
<div id="test3" className="col s12">
                      {photosFilm && photosFilm.length > 0 && (
                        <div className="film-detail-photos">
                          {photosFilm &&
                            photosFilm.map((photo, index) => (
                              <img
                                key={index}
                                src={`http://image.tmdb.org/t/p/w500${photo.file_path}`}
                              />
                            ))}
                        </div>
                      )}
                    </div>