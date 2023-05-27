const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getCurrentUserInfo);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
