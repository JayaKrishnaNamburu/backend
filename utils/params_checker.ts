export const paramsChecker = (req, res, next, paramsToCheck: string[]) => {
  const params = Object.keys(req.body || {});

  if (params.length === 0) {
    return res.status(400).end();
  }

  paramsToCheck.forEach((param: string) => {
    if (params.includes(param)) {
      return res.status(400).end();
    }
  });

  next();
};
