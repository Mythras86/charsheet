const mongoose = require("mongoose");

const charShema = mongoose.Schema({
  creatorID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  creatorName: {type: String},
  teljesnev: {type: String},
  becenev: {type: String},
  alnev: {type: String},
  testalkat: {type: String},
  hajstilus: {type: String},
  szakall: {type: String},
  nem: {type: String},
  faj: {type: String},
  anyanyelv: {type: String},
  magikus: {type: String},
  spec: {type: String},
  eletkor: {type: String},
  magassag: {type: String},
  testsuly: {type: String},
  szemszin: {type: String},
  hajszin: {type: String},
  szorszin: {type: String},
  borszin: {type: String},
  felelem: {type: String},
  osztonzo: {type: String},
  gyulolet: {type: String},
  kedvenc: {type: String},
  irtozat: {type: String},
  vonzalom: {type: String},
});

module.exports = mongoose.model("Character", charShema);
