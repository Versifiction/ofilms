import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import axios from "axios";
import classnames from "classnames";
import M from "materialize-css";
import moment from "moment";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

import "../../App.css";
import Nav from "../../components/Nav";
import Spinner from "../../components/Molecules/Spinner";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function MonCompte(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(true);
  const [editable, setEditable] = useState(false);
  const [citiesList, setCitiesList] = useState(false);
  const [departementsList, setDepartementsList] = useState(false);
  const [user, setUser] = useState(false);
  const forceUpdate = useForceUpdate();
  const [errors, setErrors] = useState({});
  const citiesUrl = `https://geo.api.gouv.fr/departements/${user &&
    user[0].departement}/communes`;
  const departementsUrl = `https://geo.api.gouv.fr/departements/`;

  useEffect(() => {
    document.title = "O'Films | Mon compte";
    loadUser();
    loadCities();
    loadDepartements();
    console.log(process.env.REACT_APP_API_URL);
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

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

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/my-account/${props.auth.user.id}`
      );
      console.log(dataUser.data);
      setUser(dataUser.data);
      // M.AutoInit();
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {}

  function validateChanges() {
    setEditable(false);
    M.toast({ html: "Vos changements ont bien été effectués" });

    update();
  }

  function cancelChanges() {
    setEditable(false);
  }

  async function update() {
    const userData = {
      email: user[0].email,
      password: user[0].password,
      confirmPassword: user[0].confirmPassword,
      username: user[0].username,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      sexe: user[0].sexe,
      mobilePhone: user[0].mobilePhone,
      departement: user[0].departement,
      city: user[0].city
    };

    console.log("userData ", userData);
    // try {
    //   const dataUser = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/api/users/update/${props.auth.user.id}`,
    //     userData
    //   );
    //   forceUpdate();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2 className="media-type">Mon compte</h2>
        <div className="row">
          <div className="col s12">
            <h4 style={{ color: "white" }}>Informations du profil</h4>
          </div>
        </div>

        {pending ? (
          <Spinner />
        ) : (
          <>
            {!editable ? (
              <>
                <div className="row" style={{ marginTop: "50px" }}>
                  <div className="col s12 m6">
                    {user &&
                      user.map(data => (
                        <>
                          <p>
                            Adresse e-mail :{" "}
                            <span style={{ color: "white" }}>{data.email}</span>
                          </p>
                          <p>
                            Pseudo :{" "}
                            <span style={{ color: "white" }}>
                              {data.username}
                            </span>
                          </p>
                          <p>
                            Nom :{" "}
                            <span style={{ color: "white" }}>
                              {data.lastname}
                            </span>
                          </p>
                          <p>
                            {" "}
                            Prénom :{" "}
                            <span style={{ color: "white" }}>
                              {data.firstname}
                            </span>
                          </p>
                          <p>
                            Sexe :{" "}
                            <span style={{ color: "white" }}>{data.sexe}</span>
                          </p>
                          <p>
                            Téléphone mobile :{" "}
                            <span style={{ color: "white" }}>
                              {data.mobilePhone}
                            </span>
                          </p>
                          <p>
                            Département :{" "}
                            <span style={{ color: "white" }}>
                              {data.departement}
                            </span>
                          </p>
                          <p>
                            Ville :{" "}
                            <span style={{ color: "white" }}>{data.city}</span>
                          </p>
                          <p>
                            Date d'inscription :{" "}
                            <span style={{ color: "white" }}>
                              {moment(data.creationDate)
                                .locale("fr")
                                .calendar()}
                            </span>
                          </p>
                          <p>
                            Date de dernière connexion :{" "}
                            <span style={{ color: "white" }}>
                              {data.lastConnection !== null
                                ? moment(data.lastConnection)
                                    .locale("fr")
                                    .calendar()
                                : "-"}
                            </span>
                          </p>
                          <p>
                            Vérifié :{" "}
                            <span style={{ color: "white" }}>
                              {data.isVerified ? (
                                <i
                                  className="material-icons"
                                  style={{ color: "green" }}
                                >
                                  check
                                </i>
                              ) : (
                                <i
                                  className="material-icons"
                                  style={{ color: "red" }}
                                >
                                  close
                                </i>
                              )}
                            </span>
                          </p>
                          <p>
                            Modérateur :{" "}
                            <span style={{ color: "white" }}>
                              {data.isModerator ? (
                                <i
                                  className="material-icons"
                                  style={{ color: "green" }}
                                >
                                  check
                                </i>
                              ) : (
                                <i
                                  className="material-icons"
                                  style={{ color: "red" }}
                                >
                                  close
                                </i>
                              )}
                            </span>
                          </p>
                          <p>
                            Admin :{" "}
                            <span style={{ color: "white" }}>
                              {data.isAdmin ? (
                                <i
                                  className="material-icons"
                                  style={{ color: "green" }}
                                >
                                  check
                                </i>
                              ) : (
                                <i
                                  className="material-icons"
                                  style={{ color: "red" }}
                                >
                                  close
                                </i>
                              )}
                            </span>
                          </p>
                          <p>
                            Fondateur :{" "}
                            <span style={{ color: "white" }}>
                              {data.isFounder ? (
                                <i
                                  className="material-icons"
                                  style={{ color: "green" }}
                                >
                                  check
                                </i>
                              ) : (
                                <i
                                  className="material-icons"
                                  style={{ color: "red" }}
                                >
                                  close
                                </i>
                              )}
                            </span>
                          </p>
                        </>
                      ))}
                  </div>
                </div>
                <div
                  className="row center"
                  style={{
                    marginTop: "40px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <button
                    className="btn-large"
                    onClick={() => {
                      setEditable(true);
                    }}
                  >
                    Modifier mes informations
                    <i className="material-icons right">edit</i>
                  </button>
                </div>
              </>
            ) : (
              <>
                {user &&
                  user.map(data => (
                    <>
                      <div className="row" style={{ marginTop: "50px" }}>
                        <form
                          className="col s12"
                          autoComplete="off"
                          onSubmit={update}
                          method="post"
                        >
                          <div className="row">
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Adresse e-mail"
                              >
                                mail
                              </i>
                              <input
                                id="email"
                                type="email"
                                name="email"
                                disabled={!editable}
                                placeholder="Entrez votre adresse e-mail"
                                value={data.email}
                                onChange={e => handleChange(e)}
                                style={{
                                  backgroundColor: "transparent !important"
                                }}
                                className={classnames("validate", {
                                  invalid: errors.email
                                })}
                                required
                              />
                              <label
                                htmlFor="email"
                                style={{ marginTop: "-20px" }}
                              >
                                Adresse e-mail *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.email}
                              </span>
                            </div>
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Pseudo"
                              >
                                message
                              </i>
                              <input
                                id="username"
                                type="text"
                                name="username"
                                disabled={!editable}
                                value={data.username}
                                onChange={e => handleChange(e)}
                                style={{ backgroundColor: "transparent" }}
                                placeholder="Entrez votre pseudo"
                                className={classnames("validate", {
                                  invalid: errors.username
                                })}
                                required
                              />
                              <label
                                htmlFor="username"
                                style={{ marginTop: "-20px" }}
                              >
                                Pseudo *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.username}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Prénom"
                              >
                                contacts
                              </i>
                              <input
                                placeholder="Entrez votre prénom"
                                id="firstname"
                                name="firstname"
                                type="text"
                                disabled={!editable}
                                value={data.firstname}
                                onChange={e => handleChange(e)}
                                style={{ backgroundColor: "transparent" }}
                                className={classnames("validate", {
                                  invalid: errors.firstname
                                })}
                                required
                              />
                              <label
                                htmlFor="lastname"
                                style={{ marginTop: "-20px" }}
                              >
                                Nom *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.firstname}
                              </span>
                            </div>
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Nom"
                              >
                                contacts
                              </i>
                              <input
                                id="lastname"
                                type="text"
                                name="lastname"
                                disabled={!editable}
                                placeholder="Entrez votre nom"
                                value={data.lastname}
                                onChange={e => handleChange(e)}
                                style={{ backgroundColor: "transparent" }}
                                className={classnames("validate", {
                                  invalid: errors.lastname
                                })}
                                required
                              />
                              <label
                                htmlFor="firstname"
                                style={{ marginTop: "-20px" }}
                              >
                                Prénom *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.lastname}
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Sexe"
                              >
                                wc
                              </i>
                              <select
                                name="sexe"
                                id="sexe"
                                disabled={!editable}
                                onChange={e => handleChange(e)}
                                value={data.sexe}
                                className={classnames("validate", {
                                  invalid: errors.sexe
                                })}
                                required
                              >
                                <option value="" disabled selectedvalue="true">
                                  Sélectionnez votre sexe
                                </option>
                                <option value="H">Homme</option>
                                <option value="F">Femme</option>
                              </select>
                              <label
                                htmlFor="sexe"
                                style={{ marginTop: "-20px" }}
                              >
                                Sexe *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.sexe}
                              </span>
                            </div>
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Numéro de téléphone mobile"
                              >
                                phone
                              </i>
                              <input
                                id="mobilePhone"
                                type="text"
                                name="mobilePhone"
                                disabled={!editable}
                                placeholder="Entrez votre numéro de téléphone mobile"
                                value={data.mobilePhone}
                                required
                                onChange={e => handleChange(e)}
                                className={classnames("validate", {
                                  invalid: errors.mobilePhone
                                })}
                              />
                              <label
                                htmlFor="mobilePhone"
                                style={{ marginTop: "-20px" }}
                              >
                                Téléphone mobile
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.mobilePhone}
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
                              <i
                                className="material-icons colored prefix"
                                title="Département"
                              >
                                place
                              </i>
                              <select
                                name="departement"
                                id="departement"
                                disabled={!editable}
                                onChange={e => handleChange(e)}
                                value={data.departement}
                                className={classnames("validate", {
                                  invalid: errors.departement
                                })}
                                style={{ overflowY: "auto" }}
                              >
                                <option value="" disabled selectedvalue="true">
                                  Sélectionnez votre département
                                </option>
                                {departementsList &&
                                  departementsList.map(departement => (
                                    <option
                                      value={departement.code}
                                      key={departement.code}
                                    >
                                      {departement.nom} ({departement.code})
                                    </option>
                                  ))}
                              </select>
                              <label
                                htmlFor="departement"
                                style={{ marginTop: "-20px" }}
                              >
                                Département *
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.departement}
                              </span>
                            </div>
                            <div className="input-field col s6">
                              <i
                                className="material-icons colored prefix"
                                title="Ville"
                              >
                                location_city
                              </i>
                              <select
                                name="city"
                                id="city"
                                disabled={data.departement === "" || !editable}
                                onChange={e => handleChange(e)}
                                value={data.city}
                                className={classnames("validate", {
                                  invalid: errors.city
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
                              <label
                                htmlFor="city"
                                style={{ marginTop: "-20px" }}
                              >
                                Ville
                              </label>
                              <span
                                className="red-text"
                                style={{ marginLeft: "3rem" }}
                              >
                                {errors.city}
                              </span>
                            </div>
                          </div>
                          <div
                            className="row center"
                            style={{
                              marginTop: "40px",
                              display: "flex",
                              justifyContent: "center"
                            }}
                          >
                            {!editable ? (
                              <button
                                className="btn-large"
                                onClick={() => {
                                  setEditable(true);
                                }}
                              >
                                Modifier mes informations
                                <i className="material-icons right">edit</i>
                              </button>
                            ) : (
                              <>
                                <input
                                  type="submit"
                                  value="Valider"
                                  onClick={validateChanges}
                                  style={{ cursor: "pointer" }}
                                />
                                <button
                                  className="btn-large"
                                  onClick={cancelChanges}
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px"
                                  }}
                                >
                                  Annuler
                                </button>
                              </>
                            )}
                          </div>
                        </form>
                      </div>
                    </>
                  ))}
              </>
            )}
          </>
        )}
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(MonCompte);
