const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');
const { JoiValidationError } = require('../../lib/errors');

Joi.objectId = joiObjectId(Joi);

const clubCreationSchema = Joi.object().keys({
  name: Joi.string().min(6).required()
    .error(new JoiValidationError('name must have at least 6 characters')),
  stadium: Joi.string()
    .required()
    .error(new JoiValidationError('stadium name is a required field')),
  foundedIn: Joi.string()
    .required()
    .error(new JoiValidationError('foundedIn is a required field')),
  coach: Joi.string()
    .required()
    .error(new JoiValidationError('coach name is a required field')),
  founders: Joi.array()
    .items(Joi.string()),
  captain: Joi.string(),
});

const getClubSchema = Joi.object().keys({
  slug: Joi.string().required().error(new JoiValidationError('Name/Slug is a required field')),
});

module.exports = {
  clubCreationSchema,
  getClubSchema,
};
