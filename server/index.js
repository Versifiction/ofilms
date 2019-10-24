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
require("dotenv").config();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

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
app.use("/", root);

io.on("connection", function(socket) {
  socket.on("send message", function(message) {
    io.emit("send message", message);
    mongo.connect(
      `mongodb://${process.env.PORT_DB}/${process.env.COLLECTION}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) {
          console.error(err);
          return;
        }
        const db = client.db("ofilms-demo");
        const collection = db.collection("chat-messages");
        collection.insertOne(message, (err, res) => {
          if (err) throw err;
        });
        client.close();
      }
    );
  });

  socket.on("delete message", function(message) {
    io.emit("delete message", message);
    mongo.connect(
      `mongodb://${process.env.PORT_DB}/${process.env.COLLECTION}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) {
          console.error(err);
          return;
        }
        const db = client.db("ofilms-demo");
        const collection = db.collection("chat-messages");
        const id = message.id;
        const o_id = new ObjectId(id);
        collection.findOneAndDelete({ _id: o_id }, function(err, user) {
          if (err) {
            throw err;
          }
        });
        client.close();
      }
    );
  });
});

mongoose.set("useCreateIndex", true);
mongoose
  .connect(`mongodb://${process.env.PORT_DB}/${process.env.COLLECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(
      "Le serveur tourne sur le port 5000 et la connexion à la base de données MongoDB s'est bien déroulée"
    );
  })
  .catch(e =>
    console.log("Erreur lors de la connexion à la base de données ", e)
  );
