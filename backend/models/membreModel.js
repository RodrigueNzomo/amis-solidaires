const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

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

  // Méthode pour mettre à jour un membre
  update(updatedData) {
    return new Promise((resolve, reject) => {
      const { nom, prenom, email, telephone, statut, role, password } =
        updatedData;

      // Fonction pour effectuer la mise à jour avec ou sans mot de passe
      const updateMembre = (hashedPassword = null) => {
        const sql = `
          UPDATE membres 
          SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ?, role = ?, 
              password = COALESCE(?, password) 
          WHERE id = ?
        `;

        const params = [
          nom,
          prenom,
          email,
          telephone,
          statut,
          role,
          hashedPassword,
          this.id, // Utilisation de l'id de l'instance
        ];

        db.run(sql, params, function (err) {
          if (err) {
            return reject({
              status: "error",
              message: "Erreur lors de la mise à jour du membre",
              error: err.message,
            });
          }

          if (this.changes === 0) {
            return reject({
              status: "fail",
              message: "Membre non trouvé",
            });
          }

          Object.assign(this, updatedData); // Mise à jour de l'objet local
          resolve(this); // Renvoi de l'objet membre mis à jour
        });
      };

      // Si un mot de passe est fourni, le hacher avant la mise à jour
      if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return reject({
              status: "error",
              message: "Erreur lors du hashage du mot de passe",
              error: err.message,
            });
          }
          updateMembre(hashedPassword); // Mise à jour avec le mot de passe haché
        });
      } else {
        updateMembre(); // Mise à jour sans changer le mot de passe
      }
    });
  }

  // Méthode statique pour récupérer tous les membres
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM membres";

      db.all(sql, [], (err, rows) => {
        if (err) {
          return reject({
            status: "error",
            message: "Erreur lors de la récupération des membres",
            error: err.message,
          });
        }

        resolve(rows);
      });
    });
  }
}

module.exports = Membre;
