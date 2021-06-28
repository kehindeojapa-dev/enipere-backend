import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// Schema
import User from "../Model/Users.js";

// Routes

//@route GET users
//@desc get all current users in the server
//@access Public
router.get("/", (req, res) => {
  User.find()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ msg: err }));
});

//@route POST users
//@desc add a new user into the Users account
//@access Public
router.post("/", (req, res) => {
  let { username, email, password } = req.body;
  email = email.toLowerCase();

  let password2 = "";
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then((hash) => {
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    User.findOne({ email }, (err, data) => {
      if (!err) {
        if (data) {
          res.status(500).send({ msg: "Email/Username already exist" });
        } else {
          newUser
            .save()
            .then((user) =>
              res.status(201).send({ msg: `${user}, was created` })
            )
            .catch((err) =>
              res.status(500).send({ msg: "error in creating new user" })
            );
        }
      }
    });
  });
});

//@route POST users/login
//@desc validate User login
//@access Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, data) => {
    if (!err) {
      if (data) {
        const encryptPassword = data.password;
        bcrypt.compare(password, encryptPassword).then((result) => {
          if (result == true) {
            res.status(200).send(data);
          }
        });
      }
    } else {
      res.status(501).send({ msg: "Invalid username or password" });
    }
  });
});

//@route GET users/userdata
//@desc get User data
//@access Private
router.get("/userdata/:id", (req, res) => {
  const userID = req.params.id;
  User.findOne({ _id: userID }, (err, data) => {
    if (!err) {
      res.status(200).send(data);
      // console.log(data);
    } else {
      res.status(500).send({ msg: "user data not found" });
    }
  });
});

//@route DELETE user
//@desc delete a user in the server
//@access Private
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send({ msg: `${data} deleted` });
    } else {
      res.status(501).send({ msg: "User failed to delete" });
    }
  });
});

export default router;
