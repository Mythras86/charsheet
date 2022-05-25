const express = require("express");

const WeaponController = require("../controllers/weapons");

const router = express.Router();

router.post("/create", WeaponController.createWeapon);

router.patch("/:id", WeaponController.updateWeapon);

router.get("/weaponslist", WeaponController.getWeapons);

router.get("/:id", WeaponController.getOneWeapon);

router.delete("/:id", WeaponController.deleteWeapon);

module.exports = router;
