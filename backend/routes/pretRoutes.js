const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");
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

// Routes CRUD pour les prêts

// Lister tous les prêts (accessible par président et trésorier)
router
  .route("/")
  .get(presidentAndTresorier, pretController.listerPrets) // GET: Président et trésorier peuvent voir la liste des prêts
  .post(presidentOnly, pretController.creerPret); // POST: Seul le président peut créer un prêt

// Modifier ou supprimer un prêt spécifique
router
  .route("/:id")
  .put(presidentAndTresorier, pretController.modifierPret) // PUT: Président et trésorier peuvent modifier un prêt
  .delete(presidentOnly, pretController.supprimerPret); // DELETE: Seul le président peut supprimer un prêt

module.exports = router;
