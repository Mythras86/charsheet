const Armor = require("../models/armor");

exports.createArmor = (req, res, next) => {
  const armor = new Armor ({
    armorName:req.body.armorName,
    armorCategory:req.body.armorCategory,
    armorRating:req.body.armorRating,
    armorWeight:req.body.armorWeight,
    armorPrice:req.body.armorPrice,
    armorDesc:req.body.armorDesc
  });
  armor
    .save()
    .then(createdArmor => {
      res.status(201).json({
        message: "Armor added successfully",
        armor: {
          ...createdArmor,
          id: createdArmor._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Armor failed!"
      });
    });
};

exports.updateArmor = (req, res, next) => {
  const armor = new Armor({
    _id: req.body.id,
    armorName:req.body.armorName,
    armorCategory:req.body.armorCategory,
    armorRating:req.body.armorRating,
    armorWeight:req.body.armorWeight,
    armorPrice:req.body.armorPrice,
    armorDesc:req.body.armorDesc
  });
  Armor.updateOne({_id: req.params.id}, armor)
    .then(result => {
      console.log (result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized, no kidding!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Armor!"
      });
    });
};

exports.getArmors = (req, res, next) => {
  const armorQuery = Armor.find();
  let fetchedArmors;
  armorQuery
    .then(documents => {
      fetchedArmors = documents;
      return Armor.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Armors fetched successfully!",
        armors: fetchedArmors,
        maxArmors: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Armors failed!"
      });
    });
};

exports.getOneArmor = (req, res, next) => {
  Armor.findById(req.params.id)
    .then(armor => {
      if (armor) {
        res.status(200).json(armor);
      } else {
        res.status(404).json({ message: "Armor not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Armor failed!"
      });
    });
};

exports.deleteArmor = (req, res, next) => {
  Armor.deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Deletion failed" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting failed!"
      });
    });
};
