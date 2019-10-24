const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = "mongodb://localhost:27017/";

let User = require("../../models/User");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.find(
    {
      $or: [{ email: req.body.email }, { username: req.body.username }]
    },
    function(err, docs) {
      if (docs.length !== 0) {
        if (docs[0].email === req.body.email) {
          errors.email = "L'adresse email est déjà prise";
          return res
            .status(400)
            .json({ email: "L'adresse email est déjà prise" });
        } else if (docs[0].username === req.body.username) {
          errors.username = "Le pseudo est déjà pris";
          return res.status(400).json({ username: "Le pseudo est déjà pris" });
        }
      } else {
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          sexe: req.body.sexe,
          mobilePhone: req.body.mobilePhone,
          departement: req.body.departement,
          city: req.body.city,
          password: req.body.password,
          isAdmin: false,
          isModerator: false,
          isConnected: false,
          isVerified: false,
          creationDate: new Date(),
          lastConnection: ""
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    }
  );

  return {
    errors,
    isValid: isEmpty(errors)
  };
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "L'adresse email existe déjà";
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        user.lastConnection = new Date();

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 7200
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Le mot de passe saisi n'est pas correct";
        // return res
        //   .status(400)
        //   .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
});

router.get("/getAll", function(req, res) {
  console.log("get all users");
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
      const collection = db.collection("users");
      collection.find().toArray((err, items) => {
        res.json(items);
      });
      client.close();
    }
  );
});

router.get("/my-account/:id", function(req, res) {
  console.log("get my account infos");
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.find({ _id: o_id }).toArray((err, items) => {
        res.json(items);
      });
      client.close();
    }
  );
});

router.get("/user/:username", function(req, res) {
  console.log(`get infos of user : ${req.params.username}`);
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
      const collection = db.collection("users");
      const username = req.params.username;
      collection.find({ username: username }).toArray((err, items) => {
        res.json(items);
      });
      client.close();
    }
  );
});

router.get("/user/:user/moviesLiked/:movie", function(req, res) {
  console.log(`get moviesLiked list of user ${req.params.user}`);
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
      const collection = db.collection("users");
      collection
        .find({
          _id: req.params.user,
          moviesLiked: { $in: { moviesLiked: [req.params.movie] } }
        })
        .toArray((err, items) => {
          res.json(items);
        });
      client.close();
    }
  );
});

router.get("/user/:user/seriesLiked/:serie", function(req, res) {
  console.log(`get seriesLiked list of user ${req.params.user}`);
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
      const collection = db.collection("users");
      collection
        .find({
          _id: req.params.user,
          seriesLiked: { $in: { seriesLiked: [req.params.serie] } }
        })
        .toArray((err, items) => {
          res.json(items);
        });
      client.close();
    }
  );
});

router.get("/user/:id/moviesFavorites/:movie", function(req, res) {
  console.log(`get moviesFavorites list of user ${req.params.id}`);
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
      const collection = db.collection("users");
      collection
        .find({
          _id: req.params.id,
          moviesFavorites: { $in: { moviesFavorites: [req.params.movie] } }
        })
        .toArray((err, items) => {
          res.json(items);
        });
      client.close();
    }
  );
});

router.get("/user/:id/seriesFavorites/:serie", function(req, res) {
  console.log(`get seriesFavorites list of user ${req.params.id}`);
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
      const collection = db.collection("users");
      collection
        .find({
          _id: req.params.id,
          seriesFavorites: { $in: { seriesFavorites: [req.params.serie] } }
        })
        .toArray((err, items) => {
          res.json(items);
        });
      client.close();
    }
  );
});

router.post("/user/:id/add/seriesLiked/:serie", function(req, res) {
  console.log(
    `add serie ${req.params.serie} to seriesLiked list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $addToSet: { seriesLiked: req.params.serie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/add/moviesLiked/:movie", function(req, res) {
  console.log(
    `add movie ${req.params.movie} to moviesLiked list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $addToSet: { moviesLiked: req.params.movie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/add/moviesFavorites/:movie", function(req, res) {
  console.log(
    `add movie ${req.params.movie} to moviesFavorites list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $addToSet: { moviesFavorites: req.params.movie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/add/seriesFavorites/:serie", function(req, res) {
  console.log(
    `add serie ${req.params.serie} to seriesFavorites list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $addToSet: { seriesFavorites: req.params.serie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/remove/seriesLiked/:serie", function(req, res) {
  console.log(
    `remove serie ${req.params.serie} to seriesLiked list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $pull: { seriesLiked: req.params.serie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/remove/moviesLiked/:movie", function(req, res) {
  console.log(
    `remove movie ${req.params.movie} to moviesLiked list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $pull: { moviesLiked: req.params.movie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/remove/moviesFavorites/:movie", function(req, res) {
  console.log(
    `remove movie ${req.params.movie} to moviesFavorites list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $pull: { moviesFavorites: req.params.movie } }
      );
      client.close();
    }
  );
});

router.post("/user/:id/remove/seriesFavorites/:serie", function(req, res) {
  console.log(
    `remove serie ${req.params.serie} to seriesFavorites list of user ${req.params.id}`
  );
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
      const collection = db.collection("users");
      const id = req.params.id;
      const o_id = new ObjectId(id);
      collection.update(
        { _id: o_id },
        { $pull: { seriesFavorites: req.params.serie } }
      );
      client.close();
    }
  );
});

// Defined delete | remove | destroy route
router.delete("/delete/:id", function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) res.json(err);
    else res.json("Enlevé avec succès");
  });
});

module.exports = router;
