const { Joi } = require('celebrate');
const joiObjectId = require('joi-objectid');
const { JoiValidationError } = require('../../lib/errors');

Joi.objectId = joiObjectId(Joi);

const userRegistrationSchema = Joi.object().keys({
  name: Joi.string().min(6).required()
    .error(new JoiValidationError('name must have at least 6 characters')),
  email: Joi.string().email()
    .required()
    .error(new JoiValidationError('email is a required field')),
  password: Joi.string()
    .min(8)
    .required()
    .error(new JoiValidationError('password is a required field')),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .error(new JoiValidationError('passwords must match')),
  age: Joi.number(),
  nationality: Joi.string(),
  role: Joi.any() // do not allow any definition of a role since anyone can make themselves admins!
    .forbidden()
    .error(new JoiValidationError('role is not allowed')),
});

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email()
    .required()
    .error(new JoiValidationError('email is a required field')),
  password: Joi.string()
    .min(8)
    .required()
    .error(new JoiValidationError('password is a required field')),
});

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
};
