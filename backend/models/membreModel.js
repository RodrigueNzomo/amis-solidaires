class Membre {
  constructor({ id, nom, prenom, email, telephone, statut }) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
    this.statut = statut;
  }
}

module.exports = Membre;
