const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const charRoutes = require("./routes/character");
const weaponRoutes = require("./routes/weapon");
const weaponAddonRoutes = require("./routes/weaponAddon");
const armorRoutes = require("./routes/armor");
const armorAddonRoutes = require("./routes/armorAddon");
const equipmentRoutes = require("./routes/equipment");
const cyberneticRoutes = require("./routes/cybernetic");

const app = express();

mongoose
  .connect(
    process.env.DB_CONNECT
    //"mongodb+srv://Testuser:vTrWLCEg3Mj5Jfwf@mydevdb.igiaj.mongodb.net/charsheet"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use ("/api/user", userRoutes);
app.use ("/api/chars", charRoutes);
app.use ("/api/weapons", weaponRoutes);
app.use ("/api/weaponaddons", weaponAddonRoutes);
app.use ("/api/armors", armorRoutes);
app.use ("/api/armoraddons", armorAddonRoutes);
app.use ("/api/equipments", equipmentRoutes);
app.use ("/api/cybernetics", cyberneticRoutes);

module.exports = app;
