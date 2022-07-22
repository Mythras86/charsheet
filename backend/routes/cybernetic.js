const express = require("express");

const CyberneticController = require("../controllers/cybernetics");

const router = express.Router();

router.post("/create", CyberneticController.createCybernetic);

router.patch("/:id", CyberneticController.updateCybernetic);

router.get("/list", CyberneticController.getCybernetics);

router.get("/:id", CyberneticController.getOneCybernetic);

router.delete("/:id", CyberneticController.deleteCybernetic);

module.exports = router;
