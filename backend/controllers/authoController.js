const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis" });
  }

  const sql = "SELECT * FROM membres WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification des identifiants" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérification du mot de passe avec bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret",
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "Connexion réussie",
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    });
  });
};
