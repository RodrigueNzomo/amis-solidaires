
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
