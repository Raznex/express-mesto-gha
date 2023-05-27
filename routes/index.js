const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const signInRouter = require('./users');
const signUpRouter = require('./users');
const NotFoundErr = require('../errors/notFound')
const auth = require('../middlewares/auth');

router.use(auth);

router.use('/', signInRouter);
router.use('/', signUpRouter);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => next(new NotFoundErr('Страницы по запрошенному URL не существует')));

module.exports = router;
