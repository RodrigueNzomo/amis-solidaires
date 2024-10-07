const express = require("express");
const router = express.Router();
const membreController = require("../controllers/membreController");
const verifierToken = require("../middlewares/authMiddleware"); // Middleware pour vérifier le token JWT
const verifierRole = require("../middlewares/roleMiddleware"); // Middleware pour vérifier le rôle de l'utilisateur

// Routes CRUD pour les membres avec authentification et gestion des rôles

// Lister tous les membres (accessible uniquement pour les utilisateurs avec rôle 'president' ou 'tresorier')
router.get(
  "/",
  verifierToken, // Vérifie que l'utilisateur est authentifié
  verifierRole(["president", "tresorier"]), // Rôle nécessaire pour accéder à cette route
  membreController.listerMembres // Appelle la méthode du contrôleur pour lister les membres
);

// Créer un nouveau membre (accessible uniquement pour le 'president')
router.post(
  "/",
  verifierToken, // Vérifie que l'utilisateur est authentifié
  verifierRole(["president"]), // Seul le président peut créer un membre
  membreController.creerMembre // Appelle la méthode du contrôleur pour créer un membre
);

// Modifier un membre (accessible pour les utilisateurs avec rôle 'president' ou 'tresorier')
router.put(
  "/:id",
  verifierToken, // Vérifie que l'utilisateur est authentifié
  verifierRole(["president", "tresorier"]), // Le président et le trésorier peuvent modifier un membre
  membreController.modifierMembre // Appelle la méthode du contrôleur pour modifier un membre
);

// Supprimer un membre (accessible uniquement pour le 'president')
router.delete(
  "/:id",
  verifierToken, // Vérifie que l'utilisateur est authentifié
  verifierRole(["president"]), // Seul le président peut supprimer un membre
  membreController.supprimerMembre // Appelle la méthode du contrôleur pour supprimer un membre
);

module.exports = router;
