const mongoose = require("mongoose");

const addonSchema = mongoose.Schema({
  addonName:{type: String, required: true},
  addonCategory:{type: String, required: true},
  addonPlace:{type: String, required: true},
  addonWeight:{type: Number, required: true},
  addonPrice:{type: Number, required: true},
  addonDesc:{type: String, required: true},
});

module.exports = mongoose.model("Addon", addonSchema);
