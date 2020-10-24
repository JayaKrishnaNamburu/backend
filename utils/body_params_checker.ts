export const bodyParamsChecker = (req, res, next, paramsToCheck: string[]) => {
  const params = req.body;
  let error = false;
  if (Object.keys(params || {}).length === 0) {
    error = true;
    return res.status(400).end();
  }

  paramsToCheck.forEach((param: string) => {
    if (!Object.keys(params).includes(param)) {
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
