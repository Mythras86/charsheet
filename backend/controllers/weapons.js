const Weapon = require("../models/weapon");

exports.createWeapon = (req, res, next) => {
  const weapon = new Weapon ({
    weaponName:req.body.weaponName,
    weaponType:req.body.weaponType,
    weaponRange:req.body.weaponRange,
    weaponPower:req.body.weaponPower,
    weaponDamage:req.body.weaponDamage,
    weaponWeight:req.body.weaponWeight,
    weaponPrice:req.body.weaponPrice,
    weaponDesc:req.body.weaponDesc
  });
  weapon
    .save()
    .then(createdWeapon => {
      res.status(201).json({
        message: "Weapon added successfully",
        weapon: {
          ...createdWeapon,
          id: createdWeapon._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a Weapon failed!"
      });
    });
};

exports.updateWeapon = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
  }
  const weapon = new Weapon({
    weaponName:req.body.weaponName,
    weaponType:req.body.weaponType,
    weaponRange:req.body.weaponRange,
    weaponPower:req.body.weaponPower,
    weaponDamage:req.body.weaponDamage,
    weaponWeight:req.body.weaponWeight,
    weaponPrice:req.body.weaponPrice,
    weaponDesc:req.body.weaponDesc
  });
  weapon.updateOne({ _id: req.params.id, creator: req.userData.userId }, Weapon)
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

exports.getWeapons = (req, res, next) => {
  const weaponQuery = Weapon.find();
  let fetchedWeapons;
  weaponQuery
    .then(documents => {
      fetchedWeapons = documents;
      return Weapon.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Weapons fetched successfully!",
        weapons: fetchedWeapons,
        maxWeapons: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Weapons failed!"
      });
    });
};

exports.getOneWeapon = (req, res, next) => {
  weapon.findById(req.params.id)
    .then(weapon => {
      if (weapon) {
        res.status(200).json(weapon);
      } else {
        res.status(404).json({ message: "Weapon not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Weapon failed!"
      });
    });
};

exports.deleteWeapon = (req, res, next) => {
  Weapon.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: "Deleting Weapon failed!"
      });
    });
};
