const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");

// Routes pour la gestion des membres
router.get("/", membreController.listerMembres);
router.post("/", membreController.creerMembre);
router.put("/:id", membreController.modifierMembre);
router.delete("/:id", membreController.supprimerMembre);

module.exports = router;
