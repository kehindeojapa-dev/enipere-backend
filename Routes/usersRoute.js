import express from "express";

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

  const newUser = new User({
    username,
    email,
    password,
  });

  User.findOne({ email }, (err, data) => {
    if (!err) {
      // res.status(500).send({ msg: "Email already exist" });
      if (data) {
        res.status(500).send({ msg: "Email/Username already exist" });
      } else {
        newUser
          .save()
          .then((user) => res.status(201).send({ msg: `${user}, was created` }))
          .catch((err) =>
            res.status(500).send({ msg: "error in creating new user" })
          );
      }
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
