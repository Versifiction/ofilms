import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import axios from "axios";
import classnames from "classnames";
import moment from "moment";
import M from "materialize-css";

import "../../App.css";
import Nav from "../../components/Nav";
import Spinner from "../../components/Molecules/Spinner";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function User({ match }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(false);
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
    lastConnection: "",
    isVerified: "",
    isModerator: "",
    isAdmin: "",
    errors: {}
  });

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/user/${match.params.username}`
      );
      setUser(dataUser.data);
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
      document.title = `O'Films | ${dataUser.data[0].username}`;
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        {pending ? (
          <Spinner />
        ) : (
          user &&
          user.map(data => (
            <>
              <h2 className="media-type">{data.username}</h2>
              <div className="row">
                <div className="col s12">
                  <h4 style={{ color: "white" }}>Informations du profil</h4>
                </div>
              </div>

              <div className="row" style={{ marginTop: "50px" }}>
                <div className="col s12 m6">
                  {user &&
                    user.map(data => (
                      <>
                        {/* <p>
                          Adresse e-mail :{" "}
                          <span style={{ color: "white" }}>{data.email}</span>
                        </p> */}
                        <p>
                          Pseudo :{" "}
                          <span style={{ color: "white" }}>
                            {data.username}
                          </span>
                        </p>
                        {/* <p>
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
                        </p> */}
                        <p>
                          Sexe :{" "}
                          <span style={{ color: "white" }}>{data.sexe}</span>
                        </p>
                        {/* <p>
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
                        </p> */}
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
              {/* <div className="row">
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
                </form>
              </div> */}
            </>
          ))
        )}
      </div>
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

export default User;
