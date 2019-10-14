import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import axios from "axios";
import classnames from "classnames";
import M from "materialize-css";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

import "../../App.css";
import Nav from "../../components/Nav";
import BandeauCookie from "../../components/BandeauCookie";

function MonCompte(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [editable, setEditable] = useState(false);
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

  useEffect(() => {
    document.title = "O'Films | Mon compte";
    M.AutoInit();
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `http://localhost:5000/api/users/my-account/${props.auth.user.id}`
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
        {user &&
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
                      <i className="material-icons colored prefix">mail</i>
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
                      <label htmlFor="username">Pseudo *</label>
                      <span className="red-text" style={{ marginLeft: "3rem" }}>
                        {fields.errors.username}
                      </span>
                    </div>
                  </div>
                  <div className="row center" style={{ marginTop: "40px" }}>
                    {!editable ? (
                      <button
                        className="btn-large waves-effect waves-light"
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
                          style={{ zIndex: "-1", cursor: "pointer" }}
                        />
                        <input
                          type="submit"
                          value="Annuler"
                          style={{
                            zIndex: "-1",
                            cursor: "pointer",
                            marginLeft: "10px"
                          }}
                        />
                      </>
                    )}
                  </div>
                </form>
              </div>
            </>
          ))}
        <div className="row">
          <form
            className="col s12"
            autoComplete="off"
            onSubmit={update}
            method="post"
          >
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">mail</i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  disabled={!editable}
                  placeholder="Entrez votre adresse e-mail"
                  value={fields.email}
                  onChange={e => handleChange(e)}
                  style={{
                    backgroundColor: "transparent !important"
                  }}
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
                  disabled={!editable}
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
            <div className="row center" style={{ marginTop: "40px" }}>
              {!editable ? (
                <button
                  className="btn-large waves-effect waves-light"
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
                    style={{ zIndex: "-1", cursor: "pointer" }}
                  />
                  <input
                    type="submit"
                    value="Annuler"
                    style={{
                      zIndex: "-1",
                      cursor: "pointer",
                      marginLeft: "10px"
                    }}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <BandeauCookie />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(MonCompte);
