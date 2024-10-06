const express = require("express");
const router = express.Router();
const aideController = require("../controllers/aideController");

// Routes CRUD pour les aides
router
  .route("/")
  .get(aideController.listerAides) // Lister toutes les aides
  .post(aideController.creerAide); // Créer une nouvelle aide

router
  .route("/:id")
  .put(aideController.modifierAide) // Modifier une aide existante
  .delete(aideController.supprimerAide); // Supprimer une aide

module.exports = router;
