const express = require("express");
const router = express.Router();
const aideController = require("../controllers/aideController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Routes CRUD pour les aides avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    verifierToken,
    verifierRole(["president", "tresorier"]),
    aideController.listerAides
  )
  .post(verifierToken, verifierRole(["tresorier"]), aideController.creerAide);

router
  .route("/:id")
  .put(verifierToken, verifierRole(["tresorier"]), aideController.modifierAide)
  .delete(
    verifierToken,
    verifierRole(["president"]),
    aideController.supprimerAide
  );

module.exports = router;
