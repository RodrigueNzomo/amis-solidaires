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
  db.get(sql, [email], (err, membre) => {
    if (err) {
      return res.status(500).json({ message: "Erreur de serveur" });
    }

    if (!membre) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    bcrypt.compare(password, membre.password, (err, match) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur de vérification du mot de passe" });
      }

      if (!match) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      const token = jwt.sign(
        { id: membre.id, role: membre.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, message: "Connexion réussie" });
    });
  });
};
