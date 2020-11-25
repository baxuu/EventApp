const { validationResult } = require('express-validator');

const validationMiddleware = (schemas) => {
  return async (req, res, next) => {
    await Promise.all(schemas.map((schema) => schema.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
    const errors = result.array();
    const errorMessages = errors.map(({ msg }) => msg);
    return res.status(422).json(errorMessages);
  };
};

module.exports = validationMiddleware;
