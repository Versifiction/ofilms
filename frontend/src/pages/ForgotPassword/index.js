import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { forgotPassword } from "../../store/actions/authActions";
import axios from "axios";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function ForgotPassword(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const forceUpdate = useForceUpdate();
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [showNullError, setShowNullError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    errors: {}
  });

  useEffect(() => {
    document.title = "O'Films | Mot de passe oublié";
  }, []);

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();
  }

  async function sendMail(e) {
    console.log("send mail react");
    e.preventDefault();
    if (fields.email === "") {
      setShowError(false);
      setMessageFromServer("");
      setShowNullError(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/forgotPassword",
          {
            email: fields.email
          }
        );
        console.log(response.data);
        if (response.data === "Lien réinitialisation envoyé") {
          setShowError(false);
          setMessageFromServer("");
          setShowNullError(false);
          setEmailSent(true);
        } else {
          console.log("pb");
        }
      } catch (error) {
        console.error("err ", error);
        console.error("err res ", error.response);
        if (error.response.data === "email not in db") {
          setShowError(true);
          setMessageFromServer("");
          setShowNullError(false);
        } else if (error.response.data.message === "Pas d'utilisateur avec ce mail") {
          setShowError(true);
          setMessageFromServer(
            "Cette adresse e-mail ne correspond à aucun utilisateur"
          );
          setShowNullError(false);
        }
      }
    }
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Mot de passe oublié</h2>
      <div className="row container">
        {!emailSent ? (
          <div className="row">
            <form
              className="col s12 m6 push-m3"
              onSubmit={sendMail}
              autoComplete="off"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={e => handleChange(e)}
                    placeholder="Entrez votre adresse e-mail"
                    className={classnames("validate", {
                      invalid: fields.errors.email
                    })}
                  />
                  <label htmlFor="email">Adresse e-mail</label>
                  {showError && (
                    <span className="red-text">{messageFromServer}</span>
                  )}
                  {showNullError && (
                    <span className="red-text">
                      Veuillez saisir votre adresse e-mail
                    </span>
                  )}
                </div>
              </div>
              <div className="row center">
                <button
                  // className={`btn ${
                  //   !submittable ? "disabled" : ""
                  // }`}
                  className="btn btn-large"
                >
                  Envoyer l'e-mail
                  <i
                    className="material-icons right"
                    style={{ color: "white" }}
                  >
                    send
                  </i>
                </button>
              </div>
            </form>{" "}
          </div>
        ) : (
          <div className="row">
            <p style={{ color: "green", textAlign: "center" }}>
              L'email a été envoyé avec succès
            </p>
          </div>
        )}

        <div className="row">
          <div className="col s12 m6 push-m3">
            <div style={{ textDecoration: "underline", textAlign: "center" }}>
              <a href="/connexion">Revenir à la page de connexion</a>
            </div>
          </div>
        </div>
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default ForgotPassword;

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { forgotPassword }
// )(withRouter(ForgotPassword));
