const Char = require("../models/character");

exports.createChar = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const character = new Character({
    charName: req.body.charName,
    charClass: req.body.charClass,
    charDesc: req.body.charDesc,
    charCreator: req.userData.userId
  });
  character
    .save()
    .then(createdChar => {
      res.status(201).json({
        message: "Character added successfully",
        Char: {
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
  const Char = new Char({
    _id: req.body.id,
    charName: req.body.charName,
    charClass: req.body.charClass,
    charDesc: req.body.charDesc,
    charCreator: req.userData.userId
  });
  Char.updateOne({ _id: req.params.id, creator: req.userData.userId }, Char)
    .then(result => {
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
  const CharQuery = Char.find();
  let fetchedChars;
  CharQuery
    .then(documents => {
      fetchedChars = documents;
      return Char.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Characters fetched successfully!",
        Chars: fetchedChars,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Characters failed!"
      });
    });
};

exports.getOneChar = (req, res, next) => {
  Char.findById(req.params.id)
    .then(Char => {
      if (Char) {
        res.status(200).json(Char);
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
      if (result.n > 0) {
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
