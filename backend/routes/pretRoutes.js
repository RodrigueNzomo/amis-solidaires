const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");

// Routes CRUD pour les prêts
router
  .route("/")
  .get(pretController.listerPrets) // Lister tous les prêts
  .post(pretController.creerPret); // Créer un nouveau prêt

router
  .route("/:id")
  .put(pretController.modifierPret) // Modifier un prêt existant
  .delete(pretController.supprimerPret); // Supprimer un prêt

module.exports = router;
