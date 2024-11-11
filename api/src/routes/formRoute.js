const express = require('express');
const validator = require('../middleware/validatorMiddleware');

const formRouter = express.Router();
const formController = require('../controllers/formController');

/**
 * Аll routes start with '/form'
 * */

formRouter.post('/', validator('form-schema'), formController.create);

formRouter.get('/:id', formController.details);

formRouter.get('/', formController.list);

formRouter.put('/:id', validator('form-schema'), formController.update);

formRouter.delete('/:id', formController.delete);

module.exports = formRouter;
