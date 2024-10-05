// membreController.js : Gestion des requêtes pour les membres (création, modification, suppression, etc.).
const membres = []; // Simulation d'une base de données en mémoire

exports.listerMembres = (req, res) => {
  res.json(membres);
};

exports.creerMembre = (req, res) => {
  const nouveauMembre = req.body;
  nouveauMembre.id = membres.length + 1; // Générer un ID unique
  membres.push(nouveauMembre);
  res.status(201).json(nouveauMembre);
};

exports.modifierMembre = (req, res) => {
  const id = parseInt(req.params.id);
  const membre = membres.find((m) => m.id === id);
  if (membre) {
    Object.assign(membre, req.body);
    res.status(200).json(membre);
  } else {
    res.status(404).send("Membre non trouvé");
  }
};

exports.supprimerMembre = (req, res) => {
  const id = parseInt(req.params.id);
  const index = membres.findIndex((m) => m.id === id);
  if (index !== -1) {
    membres.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Membre non trouvé");
  }
};
