const jwt = require("jasonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "its_a_secret_dont_tell_anyone");
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed!"});
  }

};
