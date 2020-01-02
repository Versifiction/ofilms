/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";
import useForceUpdate from "use-force-update";
import io from "socket.io-client";
import moment from "moment";
import "moment/locale/fr";
import Cookies from "universal-cookie";

import IconsUserChat from "../../components/IconsUserChat";
import "../../App.css";

import Nav from "../../components/Nav";
import Spinner from "../../components/Molecules/Spinner";
import BandeauCookie from "../../components/BandeauCookie";

function Chat(props) {
  const cookies = new Cookies();
  const forceUpdate = useForceUpdate();
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFounder, setIsFounder] = useState(false);
  const [pending, setPending] = useState(true);
  const [someoneIsWriting, setSomeoneIsWriting] = useState();
  const socket = io(process.env.REACT_APP_API_URL, { secure: true });

  useEffect(() => {
    document.title = "O'Films | Chat";
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      loadUser();
    }

    socket.open();
    loadMessages();

    return () => {
      socket.close();
    };
  }, []);

  // useEffect(() => {
  //   const chat = document.getElementsByClassName("chat-messages-container")[0];
  //   if (chat) {
  //     chat.scrollTop = chat.scrollHeight;
  //   }
  // }, [messages]);

  useEffect(() => {
    M.AutoInit();

    socket.on("send message", data => {
      setMessages([...messages, data]);
    });

    socket.on("delete message", data => {
      setMessages(messages.filter(message => message._id !== data.id));
    });

    socket.on("typing message", data => {
      document.getElementById("typing-names").innerHTML = data.message;
      setSomeoneIsWriting(data.typingusers.length > 0);
    });

    socket.on("not typing message", message => {
      document.getElementById("typing-names").innerHTML = message;
    });

    setSomeoneIsWriting(
      document.getElementById("typing-names").innerHTML !== ""
    );
  });

  useEffect(() => {
    if (inputValue.length > 0) {
      socket.emit("typing message", { username });
    } else {
      socket.emit("not typing message", { username });
    }
  }, [inputValue]);

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/my-account/${props.auth.user.id}`
      );
      setUsername(dataUser.data[0].username);
      setIsVerified(dataUser.data[0].isVerified);
      setIsModerator(dataUser.data[0].isModerator);
      setIsAdmin(dataUser.data[0].isAdmin);
      setIsFounder(dataUser.data[0].isFounder);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMessages() {
    try {
      const dataMessages = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/chat/messages`
      );
      setMessages(dataMessages.data);
      setPending(false);
      const chat = document.getElementsByClassName(
        "chat-messages-container"
      )[0];
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage(id) {
    socket.emit("delete message", { id: id });
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function emptyInputValue() {
    setInputValue("");
  }

  async function sendMessage(e) {
    e.preventDefault();

    socket.emit("send message", {
      writer: username,
      content: inputValue,
      date: new Date(),
      isMasked: false,
      isFounder: isFounder,
      isVerified: isVerified,
      isModerator: isModerator,
      isAdmin: isAdmin
    });

    setInputValue("");
  }

  function acceptChatRules() {
    cookies.set("accept-chat-regles-ofilms", true, {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2>Chat</h2>
        <div className="chat" style={{ fontFamily: "Josefin Sans" }}>
          <div className="chat-elements" style={{ position: "relative" }}>
            <div className="chat-container">
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s6">
                      <a
                        className={
                          cookies.get("accept-chat-regles-ofilms") === true
                            ? "active"
                            : ""
                        }
                        href="#messages"
                      >
                        Messages
                      </a>
                    </li>
                    <li className="tab col s6">
                      <a
                        className={
                          !cookies.get("accept-chat-regles-ofilms")
                            ? "active"
                            : ""
                        }
                        href="#infos"
                      >
                        Infos
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="messages" className="col s12">
                  <div
                    className="chat-content"
                    style={{ position: "relative" }}
                  >
                    <div className="chat-messages-container">
                      {pending ? (
                        <Spinner />
                      ) : (
                        <ul className="messages">
                          {messages &&
                            messages.map(message => (
                              <li
                                className="message"
                                key={message._id}
                                style={{ position: "relative" }}
                              >
                                <p style={{ paddingRight: "30px" }}>
                                  <IconsUserChat
                                    isFounder={message.isFounder}
                                    isVerified={message.isVerified}
                                    isModerator={message.isModerator}
                                    isAdmin={message.isAdmin}
                                  />
                                  <span style={{ fontSize: "1.25rem" }}>
                                    {message.writer}
                                  </span>{" "}
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#DEC1B5"
                                    }}
                                  >
                                    {moment(message.date)
                                      .locale("fr")
                                      .calendar()}
                                  </span>
                                  <p style={{ fontSize: "1.25rem" }}>
                                    {message.content}
                                  </p>
                                </p>
                                {isModerator && (
                                  <i
                                    className="material-icons colored right chat-messages-trash"
                                    title="Supprimer ce message"
                                    style={{
                                      cursor: "pointer",
                                      position: "absolute",
                                      top: "4px",
                                      right: "4px"
                                    }}
                                    onClick={() => {
                                      deleteMessage(message._id);
                                    }}
                                  >
                                    delete_forever
                                  </i>
                                )}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                    <div className="chat-input" style={{ marginTop: "10px" }}>
                      {props.auth.isAuthenticated ? (
                        <form
                          onSubmit={sendMessage}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="text"
                            placeholder="Ecrivez votre message..."
                            value={inputValue}
                            onChange={handleChange}
                          />
                          {inputValue.length >= 1 && (
                            <i
                              className="material-icons colored"
                              style={{
                                cursor: "pointer",
                                marginLeft: "4px",
                                marginRight: "4px"
                              }}
                              onClick={emptyInputValue}
                            >
                              highlight_off
                            </i>
                          )}
                          <input
                            type="submit"
                            value="Envoyer"
                            style={{ marginTop: "inherit" }}
                          />
                        </form>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          Vous devez être{" "}
                          <span style={{ textDecoration: "underline" }}>
                            <a href="/connexion">connecté</a>
                          </span>{" "}
                          pour envoyer des messages
                        </p>
                      )}
                    </div>
                    <div
                      className="typing-container"
                      style={{ display: "flex" }}
                    >
                      {someoneIsWriting && (
                        <div
                          className="typing-indicator"
                          style={{ width: "42px" }}
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                      <div
                        id="typing-names"
                        style={{
                          color: "white",
                          lineheight: "25px",
                          marginLeft: "6px"
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div id="infos" className="col s12">
                  <h5
                    style={{
                      color: "#95878b",
                      textDecoration: "underline",
                      fontSize: "1.5rem"
                    }}
                  >
                    Règles
                  </h5>
                  <br />
                  <p>Sont interdits dans le chat : </p>
                  <ul style={{ color: "white", fontSize: "1rem" }}>
                    <li>- Les insultes</li>
                    <li>- Les propos obscènes</li>
                    <li>- Les propos racistes</li>
                    <li>- Le spam / flood</li>
                    <li>- Les liens externes</li>
                    <li>- L'usage abusif de majuscules</li>
                    <li>- Les spoils</li>
                  </ul>
                  <br />
                  <h5
                    style={{
                      color: "#95878b",
                      textDecoration: "underline",
                      fontSize: "1.5rem"
                    }}
                  >
                    Types d'utilisateurs
                  </h5>
                  <br />
                  <h6
                    style={{
                      color: "#95878b",

                      fontSize: "1rem"
                    }}
                  >
                    Les administrateurs
                  </h6>
                  <p style={{ color: "white" }}>
                    Ce sont ceux qui ont le plus haut "rang" en terme d'actions
                    possibles sur les autres utilisateurs, que ce soit dans les
                    espaces publics (chat et forum) mais aussi en dehors de
                    ceux-ci. Ils sont également modérateurs et vérifiés.
                    <br /> Pouvoirs : Ils ont les mêmes pouvoirs que les
                    modérateurs, mais peuvent en plus clôturer un compte.
                    <br /> Badge :{" "}
                    <i
                      className="fas fa-id-badge"
                      title="Admin"
                      style={{ marginRight: "2px", color: "#0CD0FC" }}
                    ></i>
                  </p>
                  <h6
                    style={{
                      color: "#95878b",

                      fontSize: "1rem"
                    }}
                  >
                    Les modérateurs
                  </h6>
                  <p style={{ color: "white" }}>
                    Ce sont les garants du respect des règles établies dans les
                    espaces publics du site (chat et forum).
                    <br /> Pouvoirs : Ils peuvent masquer ou supprimer un
                    message et rendre muet des utilisateurs en particulier.
                    <br />
                    Badge :{" "}
                    <i
                      className="fab fa-monero"
                      title="Modérateur"
                      style={{ marginRight: "2px", color: "#0CD0FC" }}
                    ></i>
                  </p>
                  <h6
                    style={{
                      color: "#95878b",

                      fontSize: "1rem"
                    }}
                  >
                    Les vérifiés
                  </h6>
                  <p style={{ color: "white" }}>
                    Ce sont des utilisateurs remarqués par les administrateurs
                    pour leur présence, leurs messages ou leur contribution sur
                    le site.
                    <br />
                    Pouvoirs : Faire les beaux avec leur badge.
                    <br /> Badge :{" "}
                    <i
                      className="fas fa-check-circle"
                      title="Vérifié"
                      style={{ marginRight: "2px", color: "#0CD0FC" }}
                    ></i>
                  </p>
                  <br />
                  <a
                    href="#messages"
                    style={{
                      textDecoration: "underline",
                      color: "#0CD0FC",
                      fontSize: "1rem"
                    }}
                    onClick={acceptChatRules}
                  >
                    {cookies.get("accept-chat-regles-ofilms")
                      ? ""
                      : "OK, j'ai compris !"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BandeauCookie />
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Chat);
