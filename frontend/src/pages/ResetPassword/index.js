import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetPassword } from "../../store/actions/authActions";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Connexion(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    errors: {}
  });

  useEffect(() => {
    document.title = "O'Films | Réinitialisation de mot de passe";
  }, []);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();

    console.log("fields ", fields);
  }

  async function sendMail(e) {
    e.preventDefault();

    props.resetPassword(fields.email);
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Mot de passe oublié</h2>
      <div className="row container">
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
                <span className="red-text">{fields.errors.email}</span>
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
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(Connexion));
