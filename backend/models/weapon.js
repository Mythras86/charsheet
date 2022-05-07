const mongoose = require("mongoose");

const weaponSchema = mongoose.Schema({
  weaponName:{type: String, required: true},
  weaponType:{type: String, required: true},
  weaponRange:{type: Number, required: true},
  weaponPower:{type: Number, required: true},
  weaponDamage:{type: Number, required: true},
  weaponWeight:{type: Number, required: true},
  weaponPrice:{type: Number, required: true},
  weaponDesc:{type: String, required: true},
});

module.exports = mongoose.model("Weapon", weaponSchema);
