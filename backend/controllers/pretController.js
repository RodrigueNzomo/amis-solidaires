// pretController.js : Gestion des prêts et aides.
// let prets = []; // Base de données simulée

// exports.listerPrets = (req, res) => {
//   res.json(prets);
// };

// exports.ajouterPret = (req, res) => {
//   const nouveauPret = req.body;
//   nouveauPret.id = prets.length + 1;
//   prets.push(nouveauPret);
//   res.status(201).json(nouveauPret);
// };

// exports.supprimerPret = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = prets.findIndex((p) => p.id === id);
//   if (index !== -1) {
//     prets.splice(index, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send("Prêt non trouvé");
//   }
// };
let prets = []; // Base de données simulée

exports.listerPrets = (req, res) => {
  if (prets.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Aucun prêt trouvé",
    });
  }

  return res.status(200).json({
    status: "success",
    data: prets,
  });
};

exports.ajouterPret = (req, res) => {
  const { idMembre, montant, tauxInteret, echeance } = req.body;

  // Validation simple
  if (
    !idMembre ||
    !montant ||
    montant <= 0 ||
    !tauxInteret ||
    tauxInteret <= 0
  ) {
    return res.status(400).json({
      status: "fail",
      message:
        "ID membre, montant, et taux d'intérêt sont obligatoires, et doivent être positifs",
    });
  }

  const nouveauPret = {
    id: prets.length + 1,
    idMembre,
    montant,
    tauxInteret,
    echeance: echeance || new Date().toISOString(), // Utilise la date actuelle si aucune date d'échéance n'est fournie
  };

  prets.push(nouveauPret);

  return res.status(201).json({
    status: "success",
    data: nouveauPret,
  });
};

exports.supprimerPret = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const index = prets.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Prêt avec l'ID ${id} non trouvé`,
    });
  }

  prets.splice(index, 1);

  return res.status(204).send(); // Réponse sans contenu, succès
};
