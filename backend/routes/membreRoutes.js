const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");
const verifierToken = require("../middlewares/authMiddleware");
const verifierRole = require("../middlewares/roleMiddleware");

// Définition des rôles
const ROLES = {
  PRESIDENT: "president",
  TRESORIER: "tresorier",
};

// Middlewares communs
const authMiddleware = [verifierToken];
const presidentOnly = [...authMiddleware, verifierRole([ROLES.PRESIDENT])];
const presidentAndTresorier = [
  ...authMiddleware,
  verifierRole([ROLES.PRESIDENT, ROLES.TRESORIER]),
];

// Routes CRUD pour les membres
router
  .route("/")
  .get(presidentAndTresorier, membreController.listerMembres)
  .post(presidentOnly, membreController.creerMembre);

router
  .route("/:id")
  .put(presidentAndTresorier, membreController.modifierMembre)
  .delete(presidentOnly, membreController.supprimerMembre);

module.exports = router;
