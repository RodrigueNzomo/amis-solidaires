const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Routes CRUD pour les membres avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    verifierToken,
    verifierRole(["president", "tresorier"]),
    membreController.listerMembres
  )
  .post(
    verifierToken,
    verifierRole(["president"]),
    membreController.creerMembre
  );

router
  .route("/:id")
  .put(
    verifierToken,
    verifierRole(["president", "tresorier"]),
    membreController.modifierMembre
  )
  .delete(
    verifierToken,
    verifierRole(["president"]),
    membreController.supprimerMembre
  );

module.exports = router;
