const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Routes CRUD pour les cotisations avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    verifierToken,
    verifierRole(["president", "tresorier"]),
    cotisationController.listerCotisations
  )
  .post(
    verifierToken,
    verifierRole(["tresorier"]),
    cotisationController.creerCotisation
  );

router
  .route("/:id")
  .put(
    verifierToken,
    verifierRole(["tresorier"]),
    cotisationController.modifierCotisation
  )
  .delete(
    verifierToken,
    verifierRole(["president"]),
    cotisationController.supprimerCotisation
  );

module.exports = router;
