const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");
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

// Routes CRUD pour les membres

// Route pour lister les membres (accessible par président et trésorier)
router
  .route("/")
  .get(presidentAndTresorier, membreController.listerMembres) // GET: président et trésorier peuvent voir la liste
  .post(presidentOnly, membreController.creerMembre); // POST: seulement le président peut créer un membre

// Route pour modifier ou supprimer un membre spécifique
router
  .route("/:id")
  .put(presidentAndTresorier, membreController.modifierMembre) // PUT: président et trésorier peuvent modifier
  .delete(presidentOnly, membreController.supprimerMembre); // DELETE: seulement le président peut supprimer

module.exports = router;
