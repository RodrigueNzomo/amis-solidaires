const jwt = require("jsonwebtoken");

const verifierToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "Un token est requis pour l'authentification",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Token invalide",
      });
    }

    req.user = decoded; // Stocker les infos décodées du token
    next();
  });
};

const verifierRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        message: "Accès refusé. Vous n'avez pas les permissions nécessaires.",
      });
    }

    next();
  };
};

module.exports = { verifierToken, verifierRole };
