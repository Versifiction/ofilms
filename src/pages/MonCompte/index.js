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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [sexe, setSexe] = useState("");
  const [localisation, setLocalisation] = useState(true);
  const [mobilePhone, setMobilePhone] = useState("");
  const [departement, setDepartement] = useState("");
  const [city, setCity] = useState("");
  const [creationDate, setCreationDate] = useState(null);
  const [lastConnection, setLastConnection] = useState(null);
  const [errors, setErrors] = useState({});
  const citiesUrl = `https://geo.api.gouv.fr/departements/${departement}/communes`;
  const departementsUrl = `https://geo.api.gouv.fr/departements/`;

  useEffect(() => {
    document.title = "O'Films | Mon compte";
    loadUser();
    loadDepartements();
    console.log(process.env.REACT_APP_API_URL);
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    console.log("departement changé");
    console.log("departement ", departement);
    console.log("user ", user);
    loadCities();
  }, [departement, user]);

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
      setUser(dataUser.data);
      setEmail(user.email);
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setSexe(user.sexe);
      setMobilePhone(user.mobilePhone);
      setCity(user.city);
      setDepartement(user.departement);
      setCreationDate(user.creationDate);
      setLastConnection(user.lastConnection);
      M.AutoInit();
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
  }

  function cancelChanges() {
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
                          invalid: errors.email
                        })}
                        required
                      />
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {errors.firstname}
                      </span>
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons colored prefix" title="Nom">
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {errors.lastname}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <i className="material-icons colored prefix" title="Sexe">
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
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
