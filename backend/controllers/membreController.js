const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Configuration de la base de données
const db = new sqlite3.Database("./database.sqlite");
const SALT_ROUNDS = 10;

// Fonction utilitaire pour exécuter des requêtes SQL (async)
const asyncRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// Fonction utilitaire pour récupérer des données SQL (async)
const asyncAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Hashage des mots de passe
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Gestionnaire des réponses
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

// Contrôleur des membres
class MembreController {
  // Lister tous les membres
  async listerMembres(req, res, next) {
    try {
      const membres = await asyncAll("SELECT * FROM membres");
      if (!membres.length) {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: "Aucun membre trouvé",
        });
      }
      sendResponse(res, { data: membres });
    } catch (err) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la récupération des membres",
        error: err.message,
      });
    }
  }

  // Créer un membre
  async creerMembre(req, res, next) {
    try {
      const {
        nom,
        prenom,
        email,
        telephone,
        role = "membre",
        password,
      } = req.body;

      if (!nom || !prenom || !email || !password) {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: "Nom, prénom, email, et mot de passe sont obligatoires",
        });
      }

      const hashedPassword = await hashPassword(password);

      const { lastID } = await asyncRun(
        `INSERT INTO membres (nom, prenom, email, telephone, role, password) VALUES (?, ?, ?, ?, ?, ?)`,
        [nom, prenom, email, telephone, role, hashedPassword]
      );

      sendResponse(res, {
        status: 201,
        data: { id: lastID, nom, prenom, email, telephone, role },
      });
    } catch (err) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la création du membre",
        error: err.message,
      });
    }
  }

  // Modifier un membre
  async modifierMembre(req, res, next) {
    try {
      const { nom, prenom, email, telephone, role, password } = req.body;
      const id = parseInt(req.params.id);

      if (!nom || !prenom || !email) {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: "Nom, prénom, et email sont obligatoires",
        });
      }

      let hashedPassword = null;
      if (password) {
        hashedPassword = await hashPassword(password);
      }

      const { changes } = await asyncRun(
        `UPDATE membres SET nom = ?, prenom = ?, email = ?, telephone = ?, role = ?, password = COALESCE(?, password) WHERE id = ?`,
        [nom, prenom, email, telephone, role, hashedPassword, id]
      );

      if (changes === 0) {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: `Membre avec l'ID ${id} non trouvé`,
        });
      }

      sendResponse(res, { data: { id, nom, prenom, email, telephone, role } });
    } catch (err) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la modification du membre",
        error: err.message,
      });
    }
  }

  // Supprimer un membre
  async supprimerMembre(req, res, next) {
    try {
      const id = parseInt(req.params.id);

      const { changes } = await asyncRun("DELETE FROM membres WHERE id = ?", [
        id,
      ]);

      if (changes === 0) {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: `Membre avec l'ID ${id} non trouvé`,
        });
      }

      sendResponse(res, { status: 204 });
    } catch (err) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la suppression du membre",
        error: err.message,
      });
    }
  }
}

module.exports = new MembreController();
