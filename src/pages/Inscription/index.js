import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import M from "materialize-css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../../store/actions/authActions";
import { connect } from "react-redux";

import "../../App.css";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Inscription(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [citiesList, setCitiesList] = useState(false);
  const [departementsList, setDepartementsList] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstname: "",
    lastname: "",
    sexe: "",
    localisation: true,
    mobilePhone: "",
    departement: "",
    city: "",
    creationDate: null,
    errors: {}
  });
  const citiesUrl = `https://geo.api.gouv.fr/departements/${fields.departement}/communes`;
  const departementsUrl = `https://geo.api.gouv.fr/departements/`;

  useEffect(() => {
    document.title = "O'Films | Inscription";

    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }

    loadDepartements();
  }, []);

  useEffect(() => {
    loadCities();
  }, [fields.departement]);

  useEffect(() => {
    M.AutoInit();
  });

  // useEffect(() => {
  //   document.getElementsByClassName("dropdown-content")[1].style.overflow =
  //     "scroll";

  //   document.getElementsByClassName("dropdown-content")[2].style.overflow =
  //     "scroll";
  // });

  useEffect(() => {
    if (props.errors) {
      setFields({ ...fields, errors: props.errors });
    }
  }, [props.errors]);

  useEffect(() => {
    setFields(fields);
    forceUpdate();
  }, [fields]);

  async function loadCities() {
    try {
      const dataCities = await axios.get(citiesUrl);
      setCitiesList(dataCities.data);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadDepartements() {
    try {
      const dataDepartements = await axios.get(departementsUrl);
      setDepartementsList(dataDepartements.data);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();
  }

  function register(e) {
    e.preventDefault();

    setFields({ ...fields, creationDate: new Date() });

    const newUser = {
      email: fields.email,
      password: fields.password,
      username: fields.username,
      firstname: fields.firstname,
      lastname: fields.lastname,
      sexe: fields.sexe,
      mobilePhone: fields.mobilePhone,
      departement: fields.departement,
      city: fields.city,
      confirmPassword: fields.confirmPassword
    };

    props.registerUser(newUser, props.history);
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Inscription</h2>
      <div className="row container">
        <div className="row">
          <form
            className="col s12"
            autoComplete="off"
            onSubmit={register}
            method="post"
          >
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">mail</i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  value={fields.email}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent !important" }}
                  className={classnames("validate", {
                    invalid: fields.errors.email
                  })}
                  required
                />
                <label htmlFor="email">Adresse e-mail *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.email}
                </span>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">message</i>
                <input
                  id="username"
                  type="text"
                  name="username"
                  error={fields.errors.username}
                  value={fields.username}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Entrez votre pseudo"
                  className={classnames("validate", {
                    invalid: fields.errors.username
                  })}
                  required
                />
                <label htmlFor="username">Pseudo *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.username}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">contacts</i>
                <input
                  placeholder="Entrez votre prénom"
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={fields.firstname}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className={classnames("validate", {
                    invalid: fields.errors.firstname
                  })}
                  required
                />
                <label htmlFor="firstname">Prénom *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.firstname}
                </span>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">contacts</i>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Entrez votre nom"
                  value={fields.lastname}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className={classnames("validate", {
                    invalid: fields.errors.lastname
                  })}
                  required
                />
                <label htmlFor="lastname">Nom *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.lastname}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">wc</i>
                <select
                  name="sexe"
                  id="sexe"
                  onChange={e => handleChange(e)}
                  value={fields.sexe}
                  className={classnames("validate", {
                    invalid: fields.errors.sexe
                  })}
                  required
                >
                  <option value="" disabled selectedvalue="true">
                    Sélectionnez votre sexe
                  </option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                </select>
                <label htmlFor="sexe">Sexe *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.sexe}
                </span>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">phone</i>
                <input
                  id="mobilePhone"
                  type="text"
                  name="mobilePhone"
                  placeholder="Entrez votre numéro de téléphone mobile"
                  value={fields.mobilePhone}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className={classnames("validate", {
                    invalid: fields.errors.sexe
                  })}
                />
                <label htmlFor="mobilePhone">Téléphone mobile</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.mobilePhone}
                </span>
              </div>
            </div>
            <div className="row" style={{ position: "relative" }}>
              <i
                className="material-icons tooltipped"
                data-position="bottom"
                data-tooltip="Vous devez renseigner votre département avant de sélectionner la ville"
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "0",
                  cursor: "pointer",
                  color: "#95878B",
                  fontSize: "1rem",
                  zIndex: "1"
                }}
              >
                error
              </i>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">place</i>
                <select
                  name="departement"
                  id="departement"
                  onChange={e => handleChange(e)}
                  value={fields.departement}
                  className={classnames("validate", {
                    invalid: fields.errors.departement
                  })}
                  style={{ overflowY: "auto" }}
                >
                  <option value="" disabled selectedvalue="true">
                    Sélectionnez votre département
                  </option>
                  {departementsList &&
                    departementsList.map(departement => (
                      <option value={departement.code} key={departement.code}>
                        {departement.nom} ({departement.code})
                      </option>
                    ))}
                </select>
                <label htmlFor="departement">Département</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.departement}
                </span>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">location_city</i>
                <select
                  name="city"
                  id="city"
                  disabled={fields.departement === ""}
                  onChange={e => handleChange(e)}
                  value={fields.city}
                  className={classnames("validate", {
                    invalid: fields.errors.city
                  })}
                >
                  <option value="" disabled selectedvalue="true">
                    Sélectionnez votre ville
                  </option>
                  {citiesList &&
                    citiesList.map(city => (
                      <option value={city.nom} key={city.nom}>
                        {city.nom}
                      </option>
                    ))}
                </select>
                <label htmlFor="city">Ville</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.city}
                </span>
              </div>
            </div>
            <div className="row">
              <div
                className="input-field col s6"
                style={{ position: "relative" }}
              >
                <i className="material-icons colored prefix">fingerprint</i>
                <input
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={fields.password}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className={classnames("validate", {
                    invalid: fields.errors.password
                  })}
                  required
                />
                <i
                  className="tiny material-icons right tooltipped"
                  id="password"
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
                <label htmlFor="password">Mot de passe *</label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.password}
                </span>
              </div>
              <div
                className="input-field col s6"
                style={{ position: "relative" }}
              >
                <i className="material-icons colored prefix">fingerprint</i>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={fields.confirmPassword}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Confirmez votre mot de passe"
                  className={classnames("validate", {
                    invalid: fields.errors.confirmPassword
                  })}
                  required
                />
                <i
                  className="tiny material-icons right tooltipped"
                  id="confirmPassword"
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
                <label htmlFor="confirmPassword">
                  Confirmation du mot de passe *
                </label>
                <span className="red-text" style={{ marginLeft: "3rem" }}>
                  {fields.errors.confirmPassword}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    id="check"
                    name="localisation"
                    className="filled-in"
                    value={fields.localisation}
                    onChange={e => handleChange(e)}
                    style={{ backgroundColor: "transparent" }}
                  />
                  <span>
                    J'accepte de partager la localisation de ma ville et
                    d'apparaître sur la carte du site
                  </span>
                </label>
              </div>
            </div>
            <div className="row center" style={{ marginTop: "40px" }}>
              <input
                type="submit"
                value="M'inscrire"
                style={{ zIndex: "-1", cursor: "pointer" }}
              />
            </div>
          </form>
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

export default connect(mapStateToProps, { registerUser })(
  withRouter(Inscription)
);
