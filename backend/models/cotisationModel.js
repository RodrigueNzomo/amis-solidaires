// //  cotisationModel.js : Définissent les modèles de données pour chaque entité.
// class Cotisation {
//   constructor(idMembre, montant, dateVersement) {
//     this.idMembre = idMembre;
//     this.montant = montant;
//     this.dateVersement = dateVersement;
//   }
// }

// module.exports = Cotisation;
class Cotisation {
  constructor(idMembre, montant, dateVersement) {
    this.idMembre = idMembre;
    this.montant = montant;
    this.dateVersement = new Date(dateVersement);
  }

  // Méthode pour afficher les détails de la cotisation
  afficherDetails() {
    return `Membre ID: ${this.idMembre}, Montant: ${
      this.montant
    }FCFA, Date de Versement: ${this.dateVersement.toLocaleDateString()}`;
  }
}

module.exports = Cotisation;
