const express = require("express");
const authController = require("../controllers/authController"); // Lien avec le fichier authController.js
const { check, validationResult } = require("express-validator");

const router = express.Router();

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
