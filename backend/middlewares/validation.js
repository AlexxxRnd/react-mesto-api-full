const { celebrate, Joi } = require('celebrate');

const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Неверный URL адрес');
      }
      return value;
    }),
  }),
});

const userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Неверный URL адрес');
      }
      return value;
    }),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new BadRequestError('Неверный URL адрес');
      }
      return value;
    }),
  }),
});

const cardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signUp,
  signIn,
  userValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  createCardValidation,
  cardValidation,
};
