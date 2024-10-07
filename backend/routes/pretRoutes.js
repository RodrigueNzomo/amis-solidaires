const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Routes CRUD pour les prêts avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    verifierToken,
    verifierRole(["president", "tresorier"]),
    pretController.listerPrets // Cette ligne doit faire référence à une fonction, pas un objet.
  )
  .post(
    verifierToken,
    verifierRole(["tresorier"]),
    pretController.creerPret // Assurez-vous que pretController.creerPret est une fonction
  );

router
  .route("/:id")
  .put(
    verifierToken,
    verifierRole(["tresorier"]),
    pretController.modifierPret // Vérifiez que modifierPret est une fonction
  )
  .delete(
    verifierToken,
    verifierRole(["president"]),
    pretController.supprimerPret // Vérifiez que supprimerPret est une fonction
  );

module.exports = router;
