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
    pretController.listerPrets
  )
  .post(verifierToken, verifierRole(["tresorier"]), pretController.creerPret);

router
  .route("/:id")
  .put(verifierToken, verifierRole(["tresorier"]), pretController.modifierPret)
  .delete(
    verifierToken,
    verifierRole(["president"]),
    pretController.supprimerPret
  );

module.exports = router;
