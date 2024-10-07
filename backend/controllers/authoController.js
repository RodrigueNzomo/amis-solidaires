const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./database.sqlite");

// Fonction de login dans authController.js
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'email et le mot de passe sont fournis
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  // Rechercher l'utilisateur par email
  const sql = "SELECT * FROM membres WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Erreur lors de la vérification des identifiants",
        error: err.message,
      });
    }

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier si le mot de passe est correct
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          message: "Erreur lors de la vérification du mot de passe",
          error: err.message,
        });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Générer un token JWT si la vérification est réussie
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret", // Utilisation d'une clé secrète
        { expiresIn: "1h" } // Token valide pour 1 heure
      );

      // Réponse avec le token et les informations utilisateur
      res.json({
        message: "Connexion réussie",
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    });
  });
};
