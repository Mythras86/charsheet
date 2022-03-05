const mongoose = require("mongoose");

const charShema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  creatorName: {type: String},
  charName: {type: String, required: true},
  charClass: {type: String, required: true},
  charDesc: {type: String, required: true},
  charEro: {type: String, required: true},
  charRef: {type: String, required: true},
  charUgy: {type: String, required: true},
  charAll: {type: String, required: true},
  charEqu: {type: String, required: true},
  charFegyver: {type: String, required: true},
});

module.exports = mongoose.model("Character", charShema);
