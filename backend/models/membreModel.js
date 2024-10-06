const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const db = new sqlite3.Database(__dirname + "/../database.sqlite");

// Mise à jour de la structure de la table membres pour inclure role et password
const createMembresTableSQL = `
  CREATE TABLE IF NOT EXISTS membres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    statut TEXT,
    role TEXT DEFAULT 'membre',  -- Ajout de la colonne rôle avec une valeur par défaut "membre"
    password TEXT NOT NULL       -- Ajout de la colonne password pour l'authentification
  )
`;

db.run(createMembresTableSQL, (err) => {
  if (err) {
    console.error(
      "Erreur lors de la création de la table 'membres' :",
      err.message
    );
  } else {
    console.log(
      'Table "membres" mise à jour avec succès pour inclure les colonnes role et password.'
    );
  }
});

// Classe Membre pour manipuler les données
class Membre {
  constructor({ id, nom, prenom, email, telephone, statut, role, password }) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.statut = statut;
    this.role = role;
    this.password = password;
  }

  // Méthode pour lister tous les membres
  static getAll(callback) {
    const sql = "SELECT * FROM membres";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      const membres = rows.map((row) => new Membre(row));
      callback(null, membres);
    });
  }

  // Méthode pour trouver un membre par ID
  static findById(id, callback) {
    const sql = "SELECT * FROM membres WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      const membre = row ? new Membre(row) : null;
      callback(null, membre);
    });
  }

  // Méthode pour créer un nouveau membre avec un rôle et un mot de passe haché
  static create(membreData, callback) {
    const { nom, prenom, email, telephone, statut, role, password } =
      membreData;

    // Hashage du mot de passe avant l'insertion
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      const sql = `INSERT INTO membres (nom, prenom, email, telephone, statut, role, password) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        nom,
        prenom,
        email,
        telephone,
        statut,
        role,
        hashedPassword,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          return callback(err);
        }
        const newMembre = new Membre({ id: this.lastID, ...membreData });
        callback(null, newMembre);
      });
    });
  }

  // Méthode pour mettre à jour un membre, incluant le rôle et le mot de passe
  static update(id, updatedData, callback) {
    const { nom, prenom, email, telephone, statut, role, password } =
      updatedData;

    // Hashage du mot de passe avant la mise à jour si nécessaire
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      }

      const sql = `UPDATE membres SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ?, role = ?, password = ? WHERE id = ?`;
      const params = [
        nom,
        prenom,
        email,
        telephone,
        statut,
        role,
        hashedPassword,
        id,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          return callback(err);
        }
        if (this.changes === 0) {
          return callback(new Error("Membre non trouvé"));
        }
        const updatedMembre = new Membre({ id, ...updatedData });
        callback(null, updatedMembre);
      });
    });
  }

  // Méthode pour supprimer un membre
  static delete(id, callback) {
    const sql = "DELETE FROM membres WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) {
        return callback(err);
      }
      if (this.changes === 0) {
        return callback(new Error("Membre non trouvé"));
      }
      callback(null, true);
    });
  }
}

module.exports = Membre;
