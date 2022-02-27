const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "its_a_secret_dont_tell_anyone");
    req.userData = { useremail: decodedToken.useremail, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Check auth failed!" });
  }
};
