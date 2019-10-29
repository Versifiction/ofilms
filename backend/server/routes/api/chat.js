const express = require("express");
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = "mongodb://localhost:27017/";
const SocketIO = require("socket.io");
const io = SocketIO();

let Message = require("../../models/ChatMessage");

router.get("/messages", (req, res) => {
  mongo.connect(
    url,
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
      collection
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray((err, items) => {
          res.json(items);
        });
      client.close();
    }
  );
});

router.delete("/messages/delete/:id", (req, res) => {
  console.log("supp message dans api");
  // Message.findOneAndDelete({ _id: req.params.id }, function(err, user) {
  //   if (err) {
  //     res.json(err);
  //     console.log(err);
  //   } else {
  //     res.json("Enlevé avec succès");
  //     console.log(req.params.id);
  //     console.log("success");
  //   }
  // });
  mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db("ofilms-demo");
    const collection = db.collection("chat-messages");
    const id = req.params.id;
    const o_id = new ObjectId(id);
    collection.findOneAndDelete({ _id: o_id }, function(err, user) {
      if (err) {
        res.json(err);
        console.log(err);
      } else {
        res.json("Enlevé avec succès");
        console.log(req.params.id);
        console.log("success");
      }
    });
    client.close();
  });
});

// router.post("/messages", (req, res) => {
//   var message = new Message(req.body);
//   message.save(err => {
//     if (err) res.sendStatus(500);
//     SocketIO.emit("message", req.body);
//     res.sendStatus(200);
//   });
// });

const sendMessages = (io, data) => {
  const message = new Message();
  message.writer = data.username;
  message.content = data.content;
  message.date = data.date;
  message.isMasked = data.isMasked;
  message.save((err, message) => {
    if (err) {
      console.log("Erreur dans la sauvegarde du message");
    }
  });
};

module.exports = router;
