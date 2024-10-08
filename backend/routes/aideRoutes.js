const express = require("express");
const router = express.Router();
const aideController = require("../controllers/aideController");
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

// Routes CRUD pour les aides

// Lister toutes les aides (accessible par président et trésorier)
router.get("/", presidentAndTresorier, aideController.listerAides);

// Créer une nouvelle aide (accessible uniquement par le président)
router.post("/", presidentOnly, aideController.creerAide);

// Modifier une aide existante (accessible par président et trésorier)
router.put("/:id", presidentAndTresorier, aideController.modifierAide);

// Supprimer une aide (accessible uniquement par le président)
router.delete("/:id", presidentOnly, aideController.supprimerAide);

module.exports = router;
