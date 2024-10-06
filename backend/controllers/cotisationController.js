let cotisations = []; // Base de données simulée

exports.listerCotisations = (req, res) => {
  if (cotisations.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Aucune cotisation trouvée",
    });
  }

  return res.status(200).json({
    status: "success",
    data: cotisations,
  });
};

exports.ajouterCotisation = (req, res) => {
  const { idMembre, montant, dateVersement } = req.body;

  // Validation simple
  if (!idMembre || !montant || montant <= 0) {
    return res.status(400).json({
      status: "fail",
      message:
        "ID membre et montant sont obligatoires, et le montant doit être supérieur à 0",
    });
  }

  const nouvelleCotisation = {
    id: cotisations.length + 1,
    idMembre,
    montant,
    dateVersement: dateVersement || new Date().toISOString(), // Si aucune date n'est fournie, on utilise la date actuelle
  };

  cotisations.push(nouvelleCotisation);

  return res.status(201).json({
    status: "success",
    data: nouvelleCotisation,
  });
};

exports.supprimerCotisation = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const index = cotisations.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Cotisation avec l'ID ${id} non trouvée`,
    });
  }

  cotisations.splice(index, 1);

  return res.status(204).send(); // Succès sans contenu
};
