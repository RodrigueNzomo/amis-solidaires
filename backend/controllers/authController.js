const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./database.sqlite");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Rechercher l'utilisateur par email dans la base de données
  const sql = "SELECT * FROM membres WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Erreur lors de la vérification des identifiants",
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Email ou mot de passe incorrect",
      });
    }

    // Comparer le mot de passe fourni avec celui stocké (hashé)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({
          status: "fail",
          message: "Email ou mot de passe incorrect",
        });
      }

      // Générer un token JWT après validation du mot de passe
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret", // Clé secrète pour JWT
        { expiresIn: "1h" }
      );

      // Connexion réussie avec retour du token et des infos utilisateur
      res.status(200).json({
        status: "success",
        token,
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    });
  });
};
