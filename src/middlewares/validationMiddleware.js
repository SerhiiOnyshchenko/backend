const Joi = require('joi');
const { ValidationError, WrongBodyError } = require('../helpers/errors');

module.exports = {
  addHeroValidation: (req, res, next) => {
    const schema = Joi.object({
      nickname: Joi.string().min(3).required(),
      realName: Joi.string().min(3).required(),
      originDescription: Joi.string().min(3).required(),
      superpowers: Joi.string().min(3).required(),
      catchPhrase: Joi.string().min(3).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      if (validationResult.error.details[0].type === 'any.required') {
        const [text] = validationResult.error.details[0].path;
        next(new WrongBodyError(`missing required ${text} field`));
      } else {
        next(new ValidationError(validationResult.error.details[0].message));
      }
    }

    next();
  },
  patchHeroValidation: (req, res, next) => {
    const schema = Joi.object({
      nickname: Joi.string().min(3).optional(),
      realName: Joi.string().min(3).optional(),
      originDescription: Joi.string().min(3).optional(),
      superpowers: Joi.string().min(3).optional(),
      catchPhrase: Joi.string().min(3).optional(),
    }).min(1);
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      if (validationResult.error.details[0].type === 'object.min') {
        next(new ValidationError('missing fields'));
      } else {
        next(new ValidationError(validationResult.error.details[0].message));
      }
    }

    next();
  },
};
