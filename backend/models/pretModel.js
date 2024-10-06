class Pret {
  constructor(idMembre, montant, tauxInteret, echeance) {
    this.idMembre = idMembre;
    this.montant = montant;
    this.tauxInteret = tauxInteret;
    this.echeance = echeance;
  }

  calculerInteret() {
    return (this.montant * this.tauxInteret) / 100;
  }

  montantTotal() {
    return this.montant + this.calculerInteret();
  }
}

module.exports = Pret;
