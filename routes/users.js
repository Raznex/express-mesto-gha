const router = require('express').Router();

const {
  updateUserProfileValidation,
  updateUserAvatarValidation,
  getUserIdValidation,
} = require('../validations/usersValidation');

const {
  getUsers,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserIdValidation, getUserId);
router.get('/me', getCurrentUserInfo);
router.patch('/me', updateUserProfileValidation, updateUserProfile);
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
