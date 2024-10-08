const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./database.sqlite");

// Utilitaire pour envoyer des réponses standardisées
const sendResponse = (
  res,
  { status = 200, success = true, message = "", data = null }
) => {
  res.status(status).json({
    status: success ? "success" : "fail",
    message,
    data: data || undefined,
  });
};

// Inscription (Register)
exports.register = (req, res, next) => {
  const { nom, prenom, email, telephone, password, role = "membre" } = req.body;

  // Vérification des champs obligatoires
  if (!nom || !prenom || !email || !password) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Le nom, prénom, email, et mot de passe sont obligatoires",
    });
  }

  // Vérification si l'email existe déjà
  const sqlCheck = "SELECT * FROM membres WHERE email = ?";
  db.get(sqlCheck, [email], (err, user) => {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la vérification de l'email",
        data: err.message,
      });
    }

    if (user) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "Cet email est déjà utilisé",
      });
    }

    // Hashage du mot de passe avant de l'enregistrer dans la base de données
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return sendResponse(res, {
          status: 500,
          success: false,
          message: "Erreur lors du hashage du mot de passe",
          data: err.message,
        });
      }

      // Insertion du nouvel utilisateur
      const sqlInsert = `INSERT INTO membres (nom, prenom, email, telephone, password, role) 
                         VALUES (?, ?, ?, ?, ?, ?)`;
      const params = [
        nom,
        prenom,
        email,
        telephone || "",
        hashedPassword,
        role,
      ];

      db.run(sqlInsert, params, function (err) {
        if (err) {
          return sendResponse(res, {
            status: 500,
            success: false,
            message: "Erreur lors de la création de l'utilisateur",
            data: err.message,
          });
        }

        // Inscription réussie
        sendResponse(res, {
          status: 201,
          message: "Utilisateur créé avec succès",
          data: {
            id: this.lastID,
            nom,
            prenom,
            email,
            telephone,
            role,
          },
        });
      });
    });
  });
};

// Connexion (Login)
exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // Vérification des champs
  if (!email || !password) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Email et mot de passe sont obligatoires",
    });
  }

  // Rechercher l'utilisateur par email dans la base de données
  const sql = "SELECT * FROM membres WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    if (err) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la vérification des identifiants",
        data: err.message,
      });
    }

    if (!user) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // Comparer le mot de passe fourni avec celui stocké (hashé)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return sendResponse(res, {
          status: 401,
          success: false,
          message: "Email ou mot de passe incorrect",
        });
      }

      // Générer un token JWT après validation du mot de passe
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret", // Clé secrète pour JWT
        { expiresIn: "2h" } // Ajustement de la durée de vie du token à 2 heures
      );

      // Connexion réussie avec retour du token et des infos utilisateur
      sendResponse(res, {
        status: 200,
        message: "Connexion réussie",
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      });
    });
  });
};

// Ajout potentiel : Middleware pour vérifier le token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return sendResponse(res, {
      status: 403,
      success: false,
      message: "Un token est requis pour cette action",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // Attacher les infos utilisateur à la requête
    next();
  } catch (err) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "Token invalide",
    });
  }
};
