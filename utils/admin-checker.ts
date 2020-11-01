export const adminChecker = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    console.log(`adminChecker - Not a admin ${req.user}`);
    return res.status(401).end();
  }
  return next();
};
