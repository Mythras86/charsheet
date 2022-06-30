const Char = require("../models/character");

exports.createChar = (req, res, next) => {
  const char = new Char ({
    creator: req.userData.userId,
    creatorName: req.userData.userName,
    charName: req.body.charName,
    charClass: req.body.charClass,
    charDesc: req.body.charDesc,
    charEro: req.body.charEro,
    charRef: req.body.charRef,
    charUgy: req.body.charUgy,
    charAll: req.body.charAll,
    charEqu: req.body.charEqu,
    charFegyver: req.body.charFegyver,
  });
  char
    .save()
    .then(createdChar => {
      res.status(201).json({
        message: "Character added successfully",
        char: {
          ...createdChar,
          id: createdChar._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a Character failed!"
      });
    });
};

exports.updateChar = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
  }
  const char = new Char({
    _id: req.body.id,
    charName: req.body.charName,
    charClass: req.body.charClass,
    charDesc: req.body.charDesc,
    creator: req.userData.userId
  });
  char.updateOne({ _id: req.params.id, creator: req.userData.userId }, Char)
    .then(result => {
      console.log (result);
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Character!"
      });
    });
};

exports.getChars = (req, res, next) => {
  const charQuery = Char.find();
  let fetchedChars;
  charQuery
    .then(documents => {
      fetchedChars = documents;
      return Char.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Chars fetched successfully!",
        chars: fetchedChars,
        maxChars: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching chars failed!"
      });
    });
};

exports.getOneChar = (req, res, next) => {
  Char.findById(req.params.id)
    .then(char => {
      if (char) {
        res.status(200).json(char);
      } else {
        res.status(404).json({ message: "Character not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Character failed!"
      });
    });
};

exports.deleteChar = (req, res, next) => {
  Char.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting Character failed!"
      });
    });
};
