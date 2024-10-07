const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Middleware commun pour vérifier le token et les rôles pour les routes membres
const verifierMembreAcces = (roles) => [verifierToken, verifierRole(roles)];

// Routes CRUD pour les membres avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    ...verifierMembreAcces(["president", "tresorier"]), // Accès pour président et trésorier
    membreController.listerMembres
  )
  .post(
    ...verifierMembreAcces(["president"]), // Seul le président peut ajouter un membre
    membreController.creerMembre
  );

router
  .route("/:id")
  .put(
    ...verifierMembreAcces(["president", "tresorier"]), // Président et trésorier peuvent modifier un membre
    membreController.modifierMembre
  )
  .delete(
    ...verifierMembreAcces(["president"]), // Seul le président peut supprimer un membre
    membreController.supprimerMembre
  );

module.exports = router;
