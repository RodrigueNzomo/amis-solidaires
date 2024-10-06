const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");

// Routes CRUD pour les cotisations
router
  .route("/")
  .get(cotisationController.listerCotisations) // Lister toutes les cotisations
  .post(cotisationController.creerCotisation); // Créer une nouvelle cotisation

router
  .route("/:id")
  .put(cotisationController.modifierCotisation) // Modifier une cotisation existante
  .delete(cotisationController.supprimerCotisation); // Supprimer une cotisation

module.exports = router;
