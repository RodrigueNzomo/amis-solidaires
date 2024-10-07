const express = require("express");
const authController = require("../controllers/authController"); // Lien avec le fichier authController.js
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Route POST pour l'inscription avec validation
router.post(
  "/register",
  [
    // Validation des données de la requête
    check("nom", "Le nom est requis").not().isEmpty(),
    check("prenom", "Le prénom est requis").not().isEmpty(),
    check("email", "Veuillez entrer un email valide").isEmail(),
    check(
      "password",
      "Le mot de passe doit comporter au moins 6 caractères"
    ).isLength({ min: 6 }),
  ],
  (req, res, next) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(), // Retourner les erreurs de validation
      });
    }

    // Appeler le contrôleur pour traiter l'inscription
    authController.register(req, res, next);
  }
);

// Route POST pour la connexion avec validation
router.post(
  "/login",
  [
    // Validation des données de la requête
    check("email", "Veuillez entrer un email valide").isEmail(),
    check("password", "Le mot de passe est requis").not().isEmpty(),
  ],
  (req, res, next) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(), // Retourner les erreurs de validation
      });
    }

    // Appeler le contrôleur pour traiter la connexion
    authController.login(req, res, next);
  }
);

module.exports = router;
