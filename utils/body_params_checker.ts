export const bodyParamsChecker = (req, res, next, paramsToCheck: string[]) => {
  const { params } = req.body;

  if (Object.keys(params || {}).length === 0) {
    return res.status(400).end();
  }

  paramsToCheck.forEach((param: string) => {
    if (!Object.keys(params).includes(param)) {
      return res.status(400).end();
    }
  });

  next();
};
