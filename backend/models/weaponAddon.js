const mongoose = require("mongoose");

const addonSchema = mongoose.Schema({
  addonName:{type: String, required: true},
  addonCategory:{type: String, required: true},
  addonPlace:{type: String, required: true},
  addonWeight:{type: String, required: true},
  addonPrice:{type: String, required: true},
  addonDesc:{type: Number, required: true},
});

module.exports = mongoose.model("Addon", addonSchema);
