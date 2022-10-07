const router = require('express').Router();

const {
  userValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', userValidation, getUserById);
router.patch('/users/me', updateUserInfoValidation, updateProfile);
router.patch('/users/me/avatar', updateUserAvatarValidation, updateAvatar);

module.exports = router;
