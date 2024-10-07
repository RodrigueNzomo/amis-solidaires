  static update(id, updatedData, callback) {
    const { nom, prenom, email, telephone, statut, role, password } = updatedData;

    const updateMembre = (hashedPassword = null) => {
      const sql = `UPDATE membres 
                   SET nom = ?, prenom = ?, email = ?, telephone = ?, statut = ?, role = ?, password = COALESCE(?, password)
                   WHERE id = ?`;
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
    };

    // Si un mot de passe est fourni, nous le hachons avant la mise à jour
    if (password) {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return callback(err);
        }
        updateMembre(hashedPassword);
      });
    } else {
      updateMembre();
    }
  }
