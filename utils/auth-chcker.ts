export const authChecker = (req, res, next) => {
  if (!req.user) {
    console.log(`authChecker -  Invalid request from user`);
    return res.status(401).end();
  } else {
    next();
  }
};
