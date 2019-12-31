import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useForceUpdate from "use-force-update";
import StarRatingComponent from "react-star-rating-component";
import Flag from "react-world-flags";
import ItemsCarousel from "react-items-carousel";
import $ from "jquery";
import moment from "moment";

import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";
//import placeholder from '../../../images/placeholder.png';

function DetailCompany({ match }) {
  const [companyDetail, setCompanyDetail] = useState(false);
  const [pending, setPending] = useState(true);
  const companyDetailUrl = `https://api.themoviedb.org/3/company/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loadCompanyDetail();
    $("#nav-photos").hide();
    $(".nav-link").click(function(event) {
      $(this)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $(this)
        .attr("aria-selected", true)
        .siblings()
        .attr("aria-selected", false);
      event.target.id === "nav-photos-tab"
        ? $("#nav-bandesannonces").show()
        : $("#nav-bandesannonces").hide();
      event.target.id === "nav-photos-tab"
        ? $("#nav-photos").show()
        : $("#nav-photos").hide();
      $("body")
        .find(`[aria-labelledby="${event.target.id}"`)
        .addClass("show active")
        .siblings()
        .removeClass("show active");
    });
    $(".sc-bxivhb").hover(function() {
      $(this).css("box-shadow", "grey 0 0 10px 2px");
    });

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadCompanyDetail() {
    try {
      const dataCompanyDetail = await axios.get(companyDetailUrl);
      console.log("CompanyDetail ", dataCompanyDetail);
      setCompanyDetail(dataCompanyDetail.data);
      setPending(false);
      document.title = `O'Films | ${dataCompanyDetail.data.name}`;
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  function toggleTabs(event) {
    $(".active").removeClass("active");
    $(event.target).addClass("active");
    $(event.target)
      .attr("aria-selected", true)
      .siblings()
      .attr("aria-selected", false);
    event.target.id === "nav-photos-tab"
      ? $("#nav-photos").show()
      : $("#nav-photos").hide();
    $("body")
      .find(`[aria-labelledby="${event.target.id}"`)
      .addClass("show active")
      .siblings()
      .removeClass("show active");
  }

  return (
    <>
      <Nav />
      <div className="container">
        {pending ? (
          <Spinner />
        ) : (
          <div
            className="row detail-film"
            key={companyDetail && companyDetail.id}
          >
            <div className="col s12 detail-film-poster">
              {companyDetail && companyDetail.logo_path && (
                <img
                  src={`http://image.tmdb.org/t/p/w500${companyDetail &&
                    companyDetail.logo_path}`}
                  style={{ padding: "10px" }}
                  className="card-img-top"
                  alt={`Poster de ${companyDetail && companyDetail.name}`}
                />
              )}
              <h2>{companyDetail && companyDetail.name}</h2>
              {companyDetail && companyDetail.origin_country && (
                <p className="film-detail film-detail-duree">
                  Origine
                  <span>
                    <Flag
                      code={`${companyDetail.origin_country}`}
                      key={companyDetail.name}
                      className="film-production-flag"
                    />
                  </span>
                </p>
              )}
              {companyDetail && companyDetail.description && (
                <p className="film-detail">
                  Description
                  <span>
                    <div className="film-detail-keywords">
                      {companyDetail && companyDetail.description}
                    </div>
                  </span>
                </p>
              )}
              <p className="film-detail">
                Siège social
                <span>{companyDetail && companyDetail.headquarters}</span>
              </p>
              {companyDetail && companyDetail.parent_company && (
                <p className="film-detail">
                  Maison mère
                  <span>
                    <div className="film-detail-keywords">
                      {companyDetail && companyDetail.parent_company}
                    </div>
                  </span>
                </p>
              )}
              {companyDetail && companyDetail.homepage && (
                <p className="film-detail">
                  Homepage
                  <span>
                    <div className="film-detail-keywords">
                      <a href={companyDetail.homepage}>
                        {companyDetail && companyDetail.homepage}
                      </a>
                    </div>
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailCompany;
