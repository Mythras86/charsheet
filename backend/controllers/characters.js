const Char = require("../models/character");

exports.createChar = (req, res, next) => {
  const char = new Char ({
    charName: req.body.charName,
    charClass: req.body.charClass,
    charDesc: req.body.charDesc,
    creator: req.userData.userId
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
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const charQuery = Char.find();
  let fetchedChars;
  if (pageSize && currentPage) {
    charQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
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
  char.findById(req.params.id)
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
  char.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
