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

module.exports = verifierRole;
