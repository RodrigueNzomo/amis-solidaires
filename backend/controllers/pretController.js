// pretController.js : Gestion des prêts et aides.
const prets = []; // Simulation d'une base de données en mémoire

exports.listerPrets = (req, res) => {
  res.json(prets);
};

exports.ajouterPret = (req, res) => {
  const nouveauPret = req.body;
  nouveauPret.id = prets.length + 1;
  prets.push(nouveauPret);
  res.status(201).json(nouveauPret);
};

exports.supprimerPret = (req, res) => {
  const id = parseInt(req.params.id);
  const index = prets.findIndex((p) => p.id === id);
  if (index !== -1) {
    prets.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Prêt non trouvé");
  }
};
