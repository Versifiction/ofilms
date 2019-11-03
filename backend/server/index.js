const express = require("express");
const app = express();
const server = app.listen(5000);
const io = require("socket.io").listen(server);
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const users = require("./routes/api/users");
const chat = require("./routes/api/chat");
const sendMessages = require("./routes/api/chat").sendMessages;
const date = require("./routes/api/date");
const root = require("./routes/api/root");
const cors = require("cors");
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const db = require("./config/keys").mongoURI;
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/chat", chat);
app.use("/api/date", date);
// app.use("/api/sockets", sockets)
app.use("/", root);

let Message = require("./models/ChatMessage");

io.on("connection", function(socket) {
  socket.on("send message", async function(message) {
    try {
      console.log("message envoyé");
      io.emit("send message", message);
      const sent = await Message.create(message, function(err, res) {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("delete message", async function(message) {
    try {
      console.log("message supprimé");
      io.emit("delete message", message);
      const id = message.id;
      const o_id = new ObjectId(id);
      const deleted = await Message.findOneAndDelete({ _id: o_id }, function(
        err,
        user
      ) {
        if (err) {
          throw err;
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
});

console.log(process.env.USER);
console.log(process.env.PASSWORD);

// Connexion à la base de données mLab
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ofilms-demo-f9iwz.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    console.log(
      "Le serveur tourne sur le port 5000 et la connexion à la base de données MongoDB s'est bien déroulée"
    )
  )
  .catch(err => console.log(err));
