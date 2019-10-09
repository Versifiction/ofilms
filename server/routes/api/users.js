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

router.get("/getAll", function(req, res) {
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

router.get("/user/:id", function(req, res) {
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

router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
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

        // Hash password before saving in database
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      errors.email = "L'adresse email existe déjà";
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
});

// Defined delete | remove | destroy route
router.get("/delete/:id", function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) res.json(err);
    else res.json("Enlevé avec succès");
  });
});

module.exports = router;
