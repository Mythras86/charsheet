const express = require("express");

const AddonController = require("../controllers/armorAddons");

const router = express.Router();

router.post("/create", AddonController.createAddon);

router.patch("/:id", AddonController.updateAddon);

router.get("/list", AddonController.getAddons);

router.get("/:id", AddonController.getOneAddon);

router.delete("/:id", AddonController.deleteAddon);

module.exports = router;
