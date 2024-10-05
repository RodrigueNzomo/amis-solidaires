// cotisationController.js : Gestion des cotisations.
const cotisations = []; // Simulation d'une base de données en mémoire

exports.listerCotisations = (req, res) => {
  res.json(cotisations);
};

exports.ajouterCotisation = (req, res) => {
  const nouvelleCotisation = req.body;
  nouvelleCotisation.id = cotisations.length + 1;
  cotisations.push(nouvelleCotisation);
  res.status(201).json(nouvelleCotisation);
};

exports.supprimerCotisation = (req, res) => {
  const id = parseInt(req.params.id);
  const index = cotisations.findIndex((c) => c.id === id);
  if (index !== -1) {
    cotisations.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Cotisation non trouvée");
  }
};
