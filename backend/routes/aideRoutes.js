// aideRoutes.js
const express = require("express");
const router = express.Router();
const aideController = require("../controllers/aideController");

// Routes pour les aides

// Lister toutes les aides
router.get("/", aideController.listerAides);

// Créer une nouvelle aide
router.post("/", aideController.creerAide);

// Modifier une aide existante
router.put("/:id", aideController.modifierAide);

// Supprimer une aide
router.delete("/:id", aideController.supprimerAide);

module.exports = router;
