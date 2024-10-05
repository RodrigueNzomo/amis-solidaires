// membreModel.js : Définissent les modèles de données pour chaque entité.
// class Membre {
//   constructor(id, nom, prenom, email, telephone, statut) {
//     this.id = id;
//     this.nom = nom;
//     this.prenom = prenom;
//     this.email = email;
//     this.telephone = telephone;
//     this.statut = statut;
//   }
// }

// module.exports = Membre;
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
// const membre = new Membre({
//   id: 1,
//   nom: "Dupont",
//   prenom: "Jean",
//   email: "jean.dupont@example.com",
//   telephone: "0123456789",
//   statut: "actif",
// });
