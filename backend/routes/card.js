const router = require('express').Router();

const {
  createCardValidation,
  cardValidation,
} = require('../middlewares/validation');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.delete('/cards/:cardId', cardValidation, deleteCard);
router.post('/cards', createCardValidation, createCard);
router.put('/cards/:cardId/likes', cardValidation, likeCard);
router.delete('/cards/:cardId/likes', cardValidation, unlikeCard);

module.exports = router;
