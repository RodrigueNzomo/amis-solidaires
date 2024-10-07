const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./database.sqlite");

// Route de connexion
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur par email dans la base de données
  const sql = "SELECT * FROM membres WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur lors de la vérification des identifiants",
        error: err.message,
      });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Comparer le mot de passe fourni avec celui stocké (hashé)
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Connexion réussie
    res.json({ message: "Connexion réussie", userId: user.id });
  });
});

module.exports = router;
