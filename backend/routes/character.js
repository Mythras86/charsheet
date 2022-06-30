const express = require("express");

const CharController = require("../controllers/characters");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", checkAuth, CharController.createChar);

router.put("/:id", checkAuth, CharController.updateChar);

router.get("/list", CharController.getChars);

router.get("/:id", CharController.getOneChar);

router.delete("/:id", checkAuth, CharController.deleteChar);

module.exports = router;
