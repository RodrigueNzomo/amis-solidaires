const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Configuration de la base de données
const db = new sqlite3.Database("./database.sqlite");
const SALT_ROUNDS = 10;

// Utilitaires
const asyncQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

const asyncRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) reject(error);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Gestionnaire de réponses
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
  async listerMembres(req, res) {
    try {
      const membres = await asyncQuery("SELECT * FROM membres");

      if (!membres.length) {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: "Aucun membre trouvé",
        });
      }

      sendResponse(res, {
        data: membres,
      });
    } catch (error) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la récupération des membres",
        error: error.message,
      });
    }
  }

  // Créer un membre
  async creerMembre(req, res) {
    try {
      const {
        nom,
        prenom,
        email,
        telephone,
        statut = "actif",
        role = "membre",
        password,
      } = req.body;

      // Validation des champs requis
      if (!nom || !prenom || !email || !password) {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: "Nom, prénom, email, et mot de passe sont obligatoires",
        });
      }

      const hashedPassword = await hashPassword(password);

      const { lastID } = await asyncRun(
        `INSERT INTO membres (nom, prenom, email, telephone, statut, role, password) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nom, prenom, email, telephone, statut, role, hashedPassword]
      );

      sendResponse(res, {
        status: 201,
        data: {
          id: lastID,
          nom,
          prenom,
          email,
          telephone,
          statut,
          role,
        },
      });
    } catch (error) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la création du membre",
        error: error.message,
      });
    }
  }

  // Modifier un membre
  async modifierMembre(req, res) {
    try {
      const { nom, prenom, email, telephone, statut, role, password } =
        req.body;
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
        `UPDATE membres 
         SET nom = ?, prenom = ?, email = ?, telephone = ?, 
             statut = ?, role = ?, password = COALESCE(?, password)
         WHERE id = ?`,
        [nom, prenom, email, telephone, statut, role, hashedPassword, id]
      );

      if (changes === 0) {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: `Membre avec l'ID ${id} non trouvé`,
        });
      }

      sendResponse(res, {
        data: { id, nom, prenom, email, telephone, statut, role },
      });
    } catch (error) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la modification du membre",
        error: error.message,
      });
    }
  }

  // Supprimer un membre
  async supprimerMembre(req, res) {
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

      sendResponse(res, {
        status: 204,
      });
    } catch (error) {
      sendResponse(res, {
        status: 500,
        success: false,
        message: "Erreur lors de la suppression du membre",
        error: error.message,
      });
    }
  }
}

module.exports = new MembreController();
