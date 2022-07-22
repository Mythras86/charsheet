const Equipment = require("../models/equipment");

exports.createEquipment = (req, res, next) => {
  const equipment = new Equipment ({
    equipmentName:req.body.equipmentName,
    equipmentCategory:req.body.equipmentCategory,
    equipmentMaxLevel:req.body.equipmentMaxLevel,
    equipmentWeight:req.body.equipmentWeight,
    equipmentPrice:req.body.equipmentPrice,
    equipmentDesc:req.body.equipmentDesc
  });
  equipment
    .save()
    .then(createdEquipment => {
      res.status(201).json({
        message: "Equipment added successfully",
        equipment: {
          ...createdEquipment,
          id: createdEquipment._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Equipment failed!"
      });
    });
};

exports.updateEquipment = (req, res, next) => {
  const equipment = new Equipment({
    _id: req.body.id,
    equipmentName:req.body.equipmentName,
    equipmentCategory:req.body.equipmentCategory,
    equipmentMaxLevel:req.body.equipmentMaxLevel,
    equipmentWeight:req.body.equipmentWeight,
    equipmentPrice:req.body.equipmentPrice,
    equipmentDesc:req.body.equipmentDesc
  });
  Equipment.updateOne({_id: req.params.id}, equipment)
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
        message: "Couldn't udpate Equipment!"
      });
    });
};

exports.getEquipments = (req, res, next) => {
  const equipmentQuery = Equipment.find();
  let fetchedEquipments;
  equipmentQuery
    .then(documents => {
      fetchedEquipments = documents;
      return Equipment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Equipments fetched successfully!",
        equipments: fetchedEquipments,
        maxEquipments: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Equipments failed!"
      });
    });
};

exports.getOneEquipment = (req, res, next) => {
  Equipment.findById(req.params.id)
    .then(equipment => {
      if (equipment) {
        res.status(200).json(equipment);
      } else {
        res.status(404).json({ message: "Equipment not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Equipment failed!"
      });
    });
};

exports.deleteEquipment = (req, res, next) => {
  Equipment.deleteOne({ _id: req.params.id})
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
