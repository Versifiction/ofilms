import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import axios from "axios";
import classnames from "classnames";
import M from "materialize-css";
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
    document.title = "O'Films | Mon compte";
    loadUser();
    loadDepartements();
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    loadCities();
  }, [fields.departement]);

  async function loadCities() {
    try {
      const dataCities = await axios.get(citiesUrl);
      console.log("citiesList ", dataCities.data);
      setCitiesList(dataCities.data);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadDepartements() {
    try {
      const dataDepartements = await axios.get(departementsUrl);
      console.log("departementsList ", dataDepartements.data);
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
      console.log("data ", dataUser);
      setUser(dataUser.data);
      console.log("user ", user);
      fields.email = user.email;
      fields.username = user.username;
      fields.firstname = user.firstname;
      fields.lastname = user.lastname;
      fields.sexe = user.sexe;
      fields.mobilePhone = user.mobilePhone;
      fields.city = user.city;
      fields.departement = user.departement;
      fields.creationDate = user.creationDate;
      fields.lastConnection = user.lastConnection;
      M.AutoInit();
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {}

  function validateChanges() {
    console.log("function validate");
    setEditable(false);
    M.toast({ html: "Vos changements ont bien été effectués" });
  }

  function cancelChanges() {
    console.log("function cancel");
    setEditable(false);
  }

  function update() {}

  return (
    <>
      <Nav />
      <div className="container">
        <h2 className="media-type">Mon compte</h2>
        <h4 style={{ color: "white" }}>Informations du profil</h4>
        {pending ? (
          <Spinner />
        ) : (
          user &&
          user.map(data => (
            <>
              <div className="row">
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
                          invalid: fields.errors.email
                        })}
                        required
                      />
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {fields.errors.email}
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
                          invalid: fields.errors.username
                        })}
                        required
                      />
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
                        disabled={!editable}
                        value={data.firstname}
                        onChange={e => handleChange(e)}
                        style={{ backgroundColor: "transparent" }}
                        className={classnames("validate", {
                          invalid: fields.errors.firstname
                        })}
                        required
                      />
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
                        disabled={!editable}
                        placeholder="Entrez votre nom"
                        value={data.lastname}
                        onChange={e => handleChange(e)}
                        style={{ backgroundColor: "transparent" }}
                        className={classnames("validate", {
                          invalid: fields.errors.lastname
                        })}
                        required
                      />
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
                        disabled={!editable}
                        onChange={e => handleChange(e)}
                        value={data.sexe}
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
                        disabled={!editable}
                        placeholder="Entrez votre numéro de téléphone mobile"
                        value={data.mobilePhone}
                        onChange={e => handleChange(e)}
                        className={classnames("validate", {
                          invalid: fields.errors.sexe
                        })}
                      />
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
                        disabled={!editable}
                        onChange={e => handleChange(e)}
                        value={data.departement}
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
                            <option
                              value={departement.code}
                              key={departement.code}
                            >
                              {departement.nom} ({departement.code})
                            </option>
                          ))}
                      </select>
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {fields.errors.departement}
                      </span>
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons colored prefix">
                        location_city
                      </i>
                      <select
                        name="city"
                        id="city"
                        disabled={data.departement === "" || !editable}
                        onChange={e => handleChange(e)}
                        value={data.city}
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {fields.errors.city}
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
          ))
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
