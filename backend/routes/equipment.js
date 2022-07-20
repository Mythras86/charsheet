const express = require("express");

const EquipmentController = require("../controllers/equipments");

const router = express.Router();

router.post("/create", EquipmentController.createEquipment);

router.patch("/:id", EquipmentController.updateEquipment);

router.get("/list", EquipmentController.getEquipments);

router.get("/:id", EquipmentController.getOneEquipment);

router.delete("/:id", EquipmentController.deleteEquipment);

module.exports = router;
