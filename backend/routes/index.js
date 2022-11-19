const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const { createUser, login, logout } = require('../controllers/users');

const {
  checkingCreateUser,
  checkingLogin,
} = require('../middlewares/validations');

router.post('/logout', logout);
router.post('/signup', checkingCreateUser, createUser);
router.post('/signin', checkingLogin, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

module.exports = router;
