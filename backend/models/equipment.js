const mongoose = require("mongoose");

const equipmentSchema = mongoose.Schema({
  equipmentName:{type: String, required: true},
  equipmentCategory:{type: String, required: true},
  equipmentMaxLevel:{type: Number, required: true},
  equipmentWeight:{type: Number, required: true},
  equipmentPrice:{type: Number, required: true},
  equipmentDesc:{type: String, required: false},
});

module.exports = mongoose.model("Equipment", equipmentSchema, "equipments");
