const express = require("express");

const WeaponController = require("../controllers/weapons");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", checkAuth, WeaponController.createWeapon);

router.put("/:id", checkAuth, WeaponController.updateWeapon);

router.get("/weaponslist", WeaponController.getWeapons);

router.get("/:id", WeaponController.getOneWeapon);

router.delete("/:id", checkAuth, WeaponController.deleteWeapon);

module.exports = router;
