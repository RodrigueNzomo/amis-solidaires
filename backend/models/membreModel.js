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
  update(updatedData, callback) {
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
          return callback({
            status: "error",
            message: "Erreur lors de la mise à jour du membre",
            error: err.message,
          });
        }

        if (this.changes === 0) {
          return callback({
            status: "fail",
            message: "Membre non trouvé",
          });
        }

        Object.assign(this, updatedData); // Mise à jour de l'objet local
        callback(null, this); // Renvoi de l'objet membre mis à jour
      });
    };

    // Si un mot de passe est fourni, le hacher avant la mise à jour
    if (password) {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return callback({
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
  }
}
