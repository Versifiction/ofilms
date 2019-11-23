/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import useForceUpdate from "use-force-update";
import moment from "moment";
import M from "materialize-css";

import "../../App.css";
import Spinner from "../../components/Molecules/Spinner";
import Nav from "../../components/Nav";
import FloatingChat from "../../components/FloatingChat";
import BandeauCookie from "../../components/BandeauCookie";

function Users(props) {
  const [user, setUser] = useState(false);
  const [usersList, setUsersList] = useState(false);
  const [pending, setPending] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    document.title = "O'Films | Utilisateurs";
    if (props.auth.isAuthenticated) {
      loadUser();
    }
    loadAllUsers();
    M.AutoInit();
  }, []);

  async function loadUser() {
    console.log("load user");
    try {
      const dataUser = await axios.get(
        `http://localhost:5000/api/users/my-account/${props.auth.user.id}`
      );
      console.log("data ", dataUser);
      setUser(dataUser.data);
      setPending(false);
      console.log("user isadmin ", user.isAdmin);
      M.AutoInit();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadAllUsers() {
    try {
      const dataAllUsers = await axios.get(
        "http://localhost:5000/api/users/getAll"
      );
      console.log("data ", dataAllUsers);
      setUsersList(dataAllUsers.data);
      console.log("usersList ", usersList);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteUser(id) {
    axios
      .get(`http://localhost:5000/api/users/delete/${id}`)
      .then()
      .catch(err => console.log(err));

    window.location.reload();
  }

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Nav />
      <h2>Utilisateurs</h2>
      {pending ? (
        <Spinner />
      ) : (
        <>
          <table
            className="striped responsive-table centered highlight"
            style={{ color: "white" }}
          >
            <thead style={{ borderBottom: "1px solid white" }}>
              <tr>
                <th>ID</th>
                <th>E-mail</th>
                <th>Pseudo</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Sexe</th>
                <th>Téléphone mobile</th>
                <th>Ville</th>
                <th>Département</th>
                <th>Admin</th>
                <th>Modérateur</th>
                <th>Connecté</th>
                <th>Date d'inscription</th>
                <th>Dernière connexion</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList.map(user => (
                  <>
                    <tr
                      key={user._id}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <td>{user._id}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>
                        {user.sexe === "H" ? (
                          <i
                            className="fas fa-male"
                            style={{ fontSize: "30px", color: "#95878B" }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-female"
                            style={{ fontSize: "30px", color: "#0CD0FC" }}
                          ></i>
                        )}
                      </td>
                      <td>{user.mobilePhone}</td>
                      <td>{user.city}</td>
                      <td>{user.departement}</td>
                      <td>
                        {user.isAdmin ? (
                          <div className="switch">
                            <label>
                              N
                              <input type="checkbox" />
                              <span className="lever"></span>O
                            </label>
                          </div>
                        ) : (
                          <div className="switch">
                            <label>
                              N
                              <input type="checkbox" />
                              <span className="lever"></span>O
                            </label>
                          </div>
                        )}
                      </td>
                      <td>
                        {user.isModerator ? (
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
                      </td>
                      <td>
                        {user.isConnected ? (
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
                      </td>
                      <td>
                        {moment(user.creationDate)
                          .locale("fr")
                          .calendar()}
                      </td>
                      <td>
                        {user.lastConnection !== null
                          ? moment(user.lastConnection)
                              .locale("fr")
                              .calendar()
                          : "-"}
                      </td>
                      <td>
                        <button
                          data-target="modal1"
                          className="btn modal-trigger"
                          style={{
                            backgroundColor: "red",
                            marginTop: "inherit"
                          }}
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                    {/* <div id="modal1" className="modal">
                      <div className="modal-content">
                        <h4 style={{ color: "black" }}>
                          Suppression d'utilisateur
                        </h4>
                        <p>
                          Vous êtes sur le point de supprimer l'utilisateur{" "}
                          {user._id}. Voulez-vous le supprimer ?
                        </p>
                      </div>
                      <div className="modal-footer" style={{ textAlign: "center" }}>
                        <div
                          className="modal-closebtn"
                          style={{ backgroundColor: "green" }}
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Oui
                        </div>
                        <div
                          className="modal-close btn-flat"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            marginLeft: "10px"
                          }}
                        >
                          Non
                        </div>
                      </div>
                    </div> */}
                  </>
                ))}
            </tbody>
          </table>
        </>
      )}
      <FloatingChat />
      <BandeauCookie />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Users);
