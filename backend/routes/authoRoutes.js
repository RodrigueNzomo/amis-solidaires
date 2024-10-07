const express = require("express");
const authController = require("../controllers/authController"); // Lien avec le fichier authController.js

const router = express.Router();

// Route POST pour la connexion
router.post("/login", authController.login);

module.exports = router;
