const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");
const verifierToken = require("../middlewares/authMiddleware"); // Middleware pour vérifier le token JWT
const verifierRole = require("../middlewares/roleMiddleware"); // Middleware pour vérifier le rôle de l'utilisateur

// Routes CRUD pour les prêts avec protection JWT et gestion des rôles
router
  .route("/")
  .get(
    verifierToken, // Vérifie que l'utilisateur est authentifié
    verifierRole(["president", "tresorier"]), // Vérifie si l'utilisateur a le rôle adéquat
    (req, res) => {
      pretController.listerPrets(req, res); // Appelle la méthode du contrôleur pour lister les prêts
    }
  )
  .post(
    verifierToken,
    verifierRole(["tresorier"]), // Seul le trésorier peut créer un prêt
    (req, res) => {
      pretController.creerPret(req, res); // Appelle la méthode du contrôleur pour créer un prêt
    }
  );

router
  .route("/:id")
  .put(
    verifierToken,
    verifierRole(["tresorier"]), // Seul le trésorier peut modifier un prêt
    (req, res) => {
      pretController.modifierPret(req, res); // Appelle la méthode du contrôleur pour modifier un prêt
    }
  )
  .delete(
    verifierToken,
    verifierRole(["president"]), // Seul le président peut supprimer un prêt
    (req, res) => {
      pretController.supprimerPret(req, res); // Appelle la méthode du contrôleur pour supprimer un prêt
    }
  );

module.exports = router;
