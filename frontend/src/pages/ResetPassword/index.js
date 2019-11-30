import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { resetPassword } from "../../store/actions/authActions";
import axios from "axios";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function ResetPassword(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);
  const [fields, setFields] = useState({
    password: "",
    confirmPassword: "",
    errors: {}
  });

  useEffect(() => {
    console.log("props ", props);
    console.log("token ", props.match.params.token);
    document.title = "O'Films | Réinitialisation de mot de passe";
    axios
      .get("http://localhost:5000/api/users/resetPassword", {
        params: { resetPasswordToken: props.match.params.token }
      })
      .then(res => {
        console.log("res ", res);
        if (res.data.message === "Lien réinitialisation OK") {
          setUsername(res.data.username);
          setUpdated(false);
          setLoading(false);
          setErrors(false);
        } else {
          setUpdated(false);
          setLoading(false);
          setErrors(true);
        }
      })
      .catch(err => {
        console.log("err ", err);
      });
  }, []);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function updatePassword(e) {
    e.preventDefault();

    axios
      .put("http://localhost:5000/api/users/updatePasswordViaEmail", {
        username,
        password,
        resetPasswordToken: props.match.params.token
      })
      .then(res => {
        if (res.data.message === "Mot de passe mis à jour") {
          setUpdated(true);
          setErrors(false);
        } else {
          setUpdated(false);
          setErrors(true);
        }
      })
      .catch(err => {
        console.log("err ", err);
      });
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Réinitialisation du mot de passe</h2>

      <div className="container">
        {!updated ? (
          <div className="row">
            <form
              className="col s12 m6 push-m3"
              onSubmit={updatePassword}
              autoComplete="off"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Entrez votre nouveau mot de passe"
                    className={classnames("validate", {
                      invalid: errors.password
                    })}
                  />
                  <i
                    className="tiny material-icons right tooltipped"
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
                  <label htmlFor="email">Mot de passe</label>
                  <span className="red-text">{errors.password}</span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className={classnames("validate", {
                      invalid: errors.confirmPassword
                    })}
                  />
                  <i
                    className="tiny material-icons right tooltipped"
                    data-position="bottom"
                    data-tooltip={
                      passwordVisible
                        ? "Masquer votre mot de passe"
                        : "Afficher votre mot de passe"
                    }
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "18px",
                      cursor: "pointer",
                      color: "#95878B"
                    }}
                  >
                    {confirmPasswordVisible ? "visibility_off" : "visibility"}
                  </i>
                  <label htmlFor="email">Confirmation</label>
                  <span className="red-text">{errors.confirmPassword}</span>
                </div>
              </div>
              <div className="row center">
                <button
                  // className={`btn ${
                  //   !submittable ? "disabled" : ""
                  // }`}
                  className="btn btn-large"
                >
                  Valider
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <p>Votre mot de passe a été mis à jour</p>
          </>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps)(withRouter(ResetPassword));
