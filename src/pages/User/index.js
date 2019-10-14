import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import axios from "axios";
import classnames from "classnames";
import M from "materialize-css";

import "../../App.css";
import Nav from "../../components/Nav";
import BandeauCookie from "../../components/BandeauCookie";

function User({ match }) {
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
    lastConnection: "",
    isVerified: "",
    isModerator: "",
    isAdmin: "",
    errors: {}
  });

  useEffect(() => {
    M.AutoInit();
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `http://localhost:5000/api/users/user/${match.params.username}`
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
      document.title = `O'Films | ${dataUser.data[0].username}`;
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {}

  function update() {}

  return (
    <>
      <Nav />
      <div className="container">
        {user &&
          user.map(data => (
            <>
              <h2 className="media-type">{data.username}</h2>
              <h4 style={{ color: "white" }}>Informations du profil</h4>
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
          </form>
        </div>
      </div>
      <BandeauCookie />
    </>
  );
}

export default User;
