const verifierRole = (roles) => {
  return (req, res, next) => {
    // Assurez-vous que l'utilisateur et le rôle sont présents après vérification du token
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        status: "fail",
        message:
          "Les informations utilisateur ne sont pas disponibles. Authentification requise.",
      });
    }

    const userRole = req.user.role; // Récupérer le rôle de l'utilisateur

    // Vérifier si le rôle de l'utilisateur est autorisé
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        message:
          "Accès refusé. Vous n'avez pas les permissions nécessaires pour cette action.",
      });
    }

    next(); // L'utilisateur a le rôle approprié, passer au middleware suivant
  };
};

module.exports = verifierRole;
