export const authChecker = (req, res, next) => {
  if (!req.user || Object.keys(req.user || {}).length === 0) {
    console.log(`authChecker -  Invalid request from user`);
    return res.status(401).end();
  } else {
    next();
  }
};
