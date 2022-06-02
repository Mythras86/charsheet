const Addon = require("../models/weaponAddon");

exports.createAddon = (req, res, next) => {
  const addon = new Addon ({
    addonName:req.body.addonName,
    addonCategory:req.body.addonCategory,
    addonPlace:req.body.addonPlace,
    addonWeight:req.body.addonWeight,
    addonPrice:req.body.addonPrice,
    addonDesc:req.body.addonDesc
  });
  addon
    .save()
    .then(createdAddon => {
      res.status(201).json({
        message: "Addon added successfully",
        addon: {
          ...createdAddon,
          id: createdAddon._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Addon failed!"
      });
    });
};

exports.updateAddon = (req, res, next) => {
  const addon = new Addon({
    _id: req.body.id,
    addonName:req.body.addonName,
    addonCategory:req.body.addonCategory,
    addonPlace:req.body.addonPlace,
    addonWeight:req.body.addonWeight,
    addonPrice:req.body.addonPrice,
    addonDesc:req.body.addonDesc,
  });
  Addon.updateOne({_id: req.params.id}, addon)
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
        message: "Couldn't udpate Addon!"
      });
    });
};

exports.getAddons = (req, res, next) => {
  const addonQuery = Addon.find();
  let fetchedAddons;
  addonQuery
    .then(documents => {
      fetchedAddons = documents;
      return Addon.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Addons fetched successfully!",
        addons: fetchedAddons,
        maxAddons: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Addons failed!"
      });
    });
};

exports.getOneAddon = (req, res, next) => {
  Addon.findById(req.params.id)
    .then(addon => {
      if (addon) {
        res.status(200).json(addon);
      } else {
        res.status(404).json({ message: "Addon not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Addon failed!"
      });
    });
};

exports.deleteAddon = (req, res, next) => {
  Addon.deleteOne({ _id: req.params.id})
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
