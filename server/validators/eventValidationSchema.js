const { body } = require('express-validator');

const eventValidationSchema = [
  body('firstname', 'First name should be at least 4 chars long!')
    .trim()
    .isLength({
      min: 4,
    }),
  body('lastname', 'Last name should be at least 4 chars long!')
    .trim()
    .isLength({
      min: 4,
    }),
  body('email', `Invalid email address!`).trim().isEmail(),
];

module.exports = eventValidationSchema;
