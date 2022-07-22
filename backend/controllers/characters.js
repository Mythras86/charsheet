const Char = require("../models/character");

exports.createChar = (req, res, next) => {
  const char = new Char ({
    creatorID: req.userData.userId,
    creatorName: req.body.creatorName,
    teljesnev: req.body.teljesnev,
    becenev: req.body.becenev,
    alnev: req.body.alnev,
    testalkat: req.body.testalkat,
    hajstilus: req.body.hajstilus,
    szakall: req.body.szakall,
    nem: req.body.nem,
    faj: req.body.faj,
    anyanyelv: req.body.anyanyelv,
    magikus: req.body.magikus,
    spec: req.body.spec,
    eletkor: req.body.eletkor,
    magassag: req.body.magassag,
    testsuly: req.body.testsuly,
    szemszin: req.body.szemszin,
    hajszin: req.body.hajszin,
    szorszin: req.body.szorszin,
    borszin: req.body.borszin,
    felelem: req.body.felelem,
    osztonzo: req.body.osztonzo,
    gyulolet: req.body.gyulolet,
    kedvenc: req.body.kedvenc,
    irtozat: req.body.irtozat,
    vonzalom: req.body.vonzalom,
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
    creatorID: req.userData.userId,
    creatorName: req.body.creatorName,
    teljesnev: req.body.teljesnev,
    becenev: req.body.becenev,
    alnev: req.body.alnev,
    testalkat: req.body.testalkat,
    hajstilus: req.body.hajstilus,
    szakall: req.body.szakall,
    nem: req.body.nem,
    faj: req.body.faj,
    anyanyelv: req.body.anyanyelv,
    magikus: req.body.magikus,
    spec: req.body.spec,
    eletkor: req.body.eletkor,
    magassag: req.body.magassag,
    testsuly: req.body.testsuly,
    szemszin: req.body.szemszin,
    hajszin: req.body.hajszin,
    szorszin: req.body.szorszin,
    borszin: req.body.borszin,
    felelem: req.body.felelem,
    osztonzo: req.body.osztonzo,
    gyulolet: req.body.gyulolet,
    kedvenc: req.body.kedvenc,
    irtozat: req.body.irtozat,
    vonzalom: req.body.vonzalom,
  });
  char.updateOne({ _id: req.params.id, creatorID: req.userData.userId }, Char)
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
