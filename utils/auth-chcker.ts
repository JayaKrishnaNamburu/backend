export const authChecker = (req, res, next) => {
  if (!req.user) {
    return res.status(401).end();
  }
  next();
};
