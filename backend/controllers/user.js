const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.registerUser = (req, res, next) => {
  bcrypt.hash(req.body.userpass, 17).then(hash => {
    const user = new User({
      username: req.body.username,
      useremail: req.body.useremail,
      userpass: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ useremail: req.body.useremail })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email not found"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.userpass, user.userpass);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Wrong pass"
        });
      }
      const token = jwt.sign(
        { useremail: fetchedUser.useremail, userId: fetchedUser._id },
        "its_a_secret_dont_tell_anyone",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
