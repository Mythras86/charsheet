const mongoose = require("mongoose");

const charShema = mongoose.Schema({
  charName: {type: String, required: true},
  charClass: {type: String, required: true},
  charDesc: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

module.exports = mongoose.model("Character", charShema);
