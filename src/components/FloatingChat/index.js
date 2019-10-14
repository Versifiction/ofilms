import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";
import useForceUpdate from "use-force-update";
import io from "socket.io-client";

import IconsUserChat from "../IconsUserChat";
import "../../App.css";

function FloatingChat(props) {
  const forceUpdate = useForceUpdate();
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [awayFromBottomChat, setAwayFromBottomChat] = useState(false);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      loadUser();
    }
    const chat = document.getElementsByClassName("chat-content")[0];
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }, []);

  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    socket.open();
    loadMessages();

    return () => {
      socket.close();
    };
  }, []);

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `http://localhost:5000/api/users/my-account/${props.auth.user.id}`
      );
      console.log("user ", dataUser);
      setUsername(dataUser.data[0].username);
      setIsVerified(dataUser.data[0].isVerified);
      setIsModerator(dataUser.data[0].isModerator);
      setIsAdmin(dataUser.data[0].isAdmin);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMessages() {
    try {
      const dataMessages = await axios.get(
        `http://localhost:5000/api/chat/messages`
      );
      console.log("messages ", dataMessages);
      setMessages(dataMessages.data);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage(id) {
    console.log("dans fonction deletemessage");
    axios
      .get(`http://localhost:5000/api/chat/messages/delete/${id}`)
      .then(console.log("success deletemessage"))
      .catch(err => console.log(err));
  }

  function toggleChat() {
    setChatOpen(!chatOpen);
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function emptyInputValue() {
    setInputValue("");
  }

  async function sendMessage(e) {
    e.preventDefault();

    socket.emit("chat message", {
      writer: username,
      content: inputValue,
      date: new Date(),
      isMasked: false,
      isVerified: isVerified,
      isModerator: isModerator,
      isAdmin: isAdmin
    });

    setInputValue("");
  }

  return (
    <>
      {!chatOpen ? (
        <div className="fixed-action-btn" style={{ paddingTop: "inherit" }}>
          <div
            className="btn-floating btn-large"
            onClick={toggleChat}
            style={{ marginTop: "inherit" }}
          >
            <i className="large material-icons">chat</i>
          </div>
        </div>
      ) : (
        <div className="floating-chat" style={{ fontFamily: "Josefin Sans" }}>
          <div
            className="floating-chat-elements"
            style={{ position: "relative" }}
          >
            <i
              className="material-icons"
              style={{
                color: "red",
                cursor: "pointer",
                position: "absolute",
                top: "4px",
                right: "4px"
              }}
              onClick={toggleChat}
            >
              close
            </i>
            <div className="floating-chat-container">
              <div className="floating-chat-header"></div>
              <div className="floating-chat-title">
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "36px"
                  }}
                >
                  Chat
                </h3>
              </div>
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s6">
                      <a href="#messages">Messages</a>
                    </li>
                    <li className="tab col s6">
                      <a className="active" href="#infos">
                        Infos
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="messages" className="col s12">
                  <div
                    className="floating-chat-content"
                    style={{ position: "relative" }}
                  >
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
                                isVerified={message.isVerified}
                                isModerator={message.isModerator}
                                isAdmin={message.isAdmin}
                              />
                              <span>{message.writer}</span>: {message.content}
                            </p>
                            {isModerator && (
                              <i
                                className="material-icons colored right"
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
                  </div>
                </div>
                <div id="infos" className="col s12">
                  <p>
                    Pour avoir accès à toutes les fonctionnalités du chat, merci
                    de vous rendre sur la page dédiée à celui-ci :&nbsp;
                    <a href="/chat" style={{ textDecoration: "underline" }}>
                      ici
                    </a>
                  </p>
                  <p>Sont interdits dans le chat : </p>
                  <ul style={{ color: "#95878b", fontSize: "16px" }}>
                    <li>- Les insultes</li>
                    <li>- Les propos obscènes</li>
                    <li>- Les propos racistes</li>
                    <li>- Le spam / flood</li>
                    <li>- Les liens externes</li>
                    <li>- L'usage abusif de majuscules</li>
                    <li>- Les spoils</li>
                  </ul>
                  <br />
                  <a
                    href="#messages"
                    style={{
                      textDecoration: "underline",
                      color: "#0CD0FC",
                      fontSize: "16px"
                    }}
                  >
                    Basculer sur les messages
                  </a>
                </div>
              </div>

              <div className="floating-chat-input">
                {props.auth.isAuthenticated ? (
                  <form onSubmit={sendMessage}>
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
                    <input type="submit" style={{ marginTop: "inherit" }} />
                    {/* <i
                      className="material-icons colored right"
                      style={{ cursor: "pointer" }}
                    >
                      send
                    </i> */}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(FloatingChat);
