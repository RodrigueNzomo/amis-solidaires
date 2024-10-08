const express = require("express");
const router = express.Router();
const cotisationController = require("../controllers/cotisationController");
const {
  verifierToken,
  verifierRole,
} = require("../middlewares/authMiddleware");

// Définition des rôles
const ROLES = {
  PRESIDENT: "president",
  TRESORIER: "tresorier",
};

// Middleware pour authentification et autorisation
const authMiddleware = [verifierToken];
const presidentOnly = [...authMiddleware, verifierRole([ROLES.PRESIDENT])];
const presidentAndTresorier = [
  ...authMiddleware,
  verifierRole([ROLES.PRESIDENT, ROLES.TRESORIER]),
];

// Routes CRUD pour les cotisations

// Lister toutes les cotisations (accessible par président et trésorier)
router
  .route("/")
  .get(presidentAndTresorier, cotisationController.listerCotisations) // GET: président et trésorier peuvent voir la liste
  .post(presidentOnly, cotisationController.creerCotisation); // POST: Seul le président peut créer une cotisation

// Modifier ou supprimer une cotisation spécifique
router
  .route("/:id")
  .put(presidentAndTresorier, cotisationController.modifierCotisation) // PUT: président et trésorier peuvent modifier une cotisation
  .delete(presidentOnly, cotisationController.supprimerCotisation); // DELETE: Seul le président peut supprimer une cotisation

module.exports = router;
