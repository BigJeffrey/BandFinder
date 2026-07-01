const { body } = require('express-validator');

const createBandValidation = [
  body('name')
    .notEmpty()
    .withMessage('Band name is required.')
    .trim(),
  body('city')
    .notEmpty()
    .withMessage('City is required.')
    .trim(),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required.')
    .trim(),
  body('instrumentNeeded')
    .notEmpty()
    .withMessage('Instrument needed is required.')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required.')
    .trim(),
  body('contactEmail')
    .isEmail()
    .withMessage('Please provide a valid contact email.')
    .normalizeEmail(),
];

const updateBandValidation = [
  body('name')
    .notEmpty()
    .withMessage('Band name is required.')
    .trim(),
  body('city')
    .notEmpty()
    .withMessage('City is required.')
    .trim(),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required.')
    .trim(),
  body('instrumentNeeded')
    .notEmpty()
    .withMessage('Instrument needed is required.')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required.')
    .trim(),
  body('contactEmail')
    .isEmail()
    .withMessage('Please provide a valid contact email.')
    .normalizeEmail(),
];

module.exports = { createBandValidation, updateBandValidation };
