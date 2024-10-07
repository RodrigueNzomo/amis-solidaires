const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Lien avec le fichier authController.js

router.post("/login", authController.login);

module.exports = router;

// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const sqlite3 = require("sqlite3").verbose();
// const router = express.Router();

// // Connexion à la base de données SQLite
// const db = new sqlite3.Database("./database.sqlite");

// // Route de connexion
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Vérification des champs vides
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email et mot de passe requis" });
//   }

//   // Rechercher l'utilisateur par email dans la base de données
//   const sql = "SELECT * FROM membres WHERE email = ?";
//   db.get(sql, [email], (err, user) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Erreur lors de la vérification des identifiants",
//         error: err.message,
//       });
//     }

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Email ou mot de passe incorrect" });
//     }

//     // Comparer le mot de passe fourni avec celui stocké (hashé)
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Erreur lors de la vérification du mot de passe",
//         });
//       }

//       if (!isMatch) {
//         return res
//           .status(401)
//           .json({ message: "Email ou mot de passe incorrect" });
//       }

//       // Générer un token JWT après validation du mot de passe
//       const token = jwt.sign(
//         { id: user.id, role: user.role },
//         process.env.JWT_SECRET || "secret", // Clé secrète pour JWT
//         { expiresIn: "1h" }
//       );

//       // Connexion réussie avec retour du token et des infos utilisateur
//       res.json({
//         message: "Connexion réussie",
//         token,
//         user: { id: user.id, email: user.email, role: user.role },
//       });
//     });
//   });
// });

// module.exports = router;
