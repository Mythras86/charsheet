const express = require("express");

const CharController = require("../controllers/characters");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, CharController.createChar);

router.put("/:id", checkAuth, extractFile, CharController.updateChar);

router.get("", CharController.getChars);

router.get("/:id", CharController.getOneChar);

router.delete("/:id", checkAuth, CharController.deleteChar);

module.exports = router;
