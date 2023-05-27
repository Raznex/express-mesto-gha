const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');
const { loginUser, registrationUser } = require('../controllers/auth');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getCurrentUserInfo);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.post('/signin', loginUser);
router.post('/signup', registrationUser);

module.exports = router;
