const express = require("express");

const ArmorController = require("../controllers/armors");

const router = express.Router();

router.post("/create", ArmorController.createArmor);

router.patch("/:id", ArmorController.updateArmor);

router.get("/armorslist", ArmorController.getArmors);

router.get("/:id", ArmorController.getOneArmor);

router.delete("/:id", ArmorController.deleteArmor);

module.exports = router;
