const mongoose = require("mongoose");

const cyberneticSchema = mongoose.Schema({
  cyberneticName:{type: String, required: true},
  cyberneticCategory:{type: String, required: true},
  cyberneticMaxLevel:{type: Number, required: true},
  cyberneticPrice:{type: Number, required: true},
  cyberneticEssence:{type: Number, required: true},
  cyberneticDesc:{type: String, required: false},
});

module.exports = mongoose.model("Cybernetic", cyberneticSchema, "cybernetics");
