export const paramsChecker = (req, res, next, paramsToCheck: string[]) => {
  const params = Object.keys(req.params || {});
  let error = false;

  if (params.length === 0) {
    error = true;
    return res.status(400).end();
  }

  paramsToCheck.forEach((param: string) => {
    if (!params.includes(param)) {
      error = true;
      return res
        .status(400)
        .json({ error: `Missing ${param} from the request` })
        .end();
    }
  });

  if (!error) {
    next();
  }
};
