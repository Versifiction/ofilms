import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../store/actions/authActions";

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
    password: "",
    errors: {}
  });

  useEffect(() => {
    document.title = "O'Films | Connexion";

    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    if (props.errors) {
      setFields({ ...fields, errors: props.errors });
    }
  }, [props.errors]);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();
  }

  async function login(e) {
    e.preventDefault();

    setFields({ ...fields, lastConnection: new Date() });

    const { email, password } = fields;

    const userData = {
      email,
      password
    };

    props.loginUser(userData);
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Connexion</h2>
      <div className="row container">
        <div className="row">
          <form
            className="col s12 m6 push-m3"
            onSubmit={login}
            autoComplete="off"
          >
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons colored prefix">mail</i>
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
            <div className="row">
              <div
                className="input-field col s12"
                style={{ position: "relative" }}
              >
                <i className="material-icons colored prefix">fingerprint</i>
                <input
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  name="password"
                  value={fields.password}
                  onChange={e => handleChange(e)}
                  type={passwordVisible ? "text" : "password"}
                  className={classnames("validate", {
                    invalid: fields.errors.password
                  })}
                />

                <i
                  className="tiny material-icons righttooltipped"
                  data-position="bottom"
                  data-tooltip={
                    passwordVisible
                      ? "Masquer votre mot de passe"
                      : "Afficher votre mot de passe"
                  }
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "18px",
                    cursor: "pointer",
                    color: "#95878B"
                  }}
                >
                  {passwordVisible ? "visibility_off" : "visibility"}
                </i>
                <label htmlFor="password">Mot de passe</label>
                <span className="red-text">{fields.errors.password}</span>
              </div>
              <div className="row center">
                <button
                  // className={`btn ${
                  //   !submittable ? "disabled" : ""
                  // }`}
                  className="btn btn-large"
                >
                  Me connecter
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s12 m6 push-m3">
            <div style={{ textDecoration: "underline", textAlign: "center" }}>
              <a href="/forgot-password">J'ai oublié mon mot de passe</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 push-m3">
            <div style={{ textDecoration: "underline", textAlign: "center" }}>
              <a href="/inscription">Pas encore de compte ? Inscrivez-vous !</a>
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
  { loginUser }
)(withRouter(Connexion));
