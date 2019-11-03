const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const SocketIO = require("socket.io");
const io = SocketIO();

let Message = require("../../models/ChatMessage");

// io.on("connection", function(socket) {
//   socket.on("send message", async function(message) {
//     console.log("message envoyé");
//     io.emit("send message", message);
//     const message = await Message.insertOne(message, function(err, res) {
//       if (err) throw err;
//     });
//   });

//   socket.on("delete message", async function(message) {
//     console.log("message supprimé");
//     io.emit("delete message", message);
//     const id = message.id;
//     const o_id = new ObjectId(id);
//     const message = await Message.findOneAndDelete({ _id: o_id }, function(
//       err,
//       user
//     ) {
//       if (err) {
//         throw err;
//       }
//     });
//   });
// });

module.exports = router;
