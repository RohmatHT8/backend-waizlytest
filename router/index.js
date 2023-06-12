const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.post('/login', UserController.login)

router.use(authentication)
router.get('/user', authorization, UserController.index)
router.get('/user/:id', authorization, UserController.show)
router.put('/user/:id', authorization, UserController.update)
router.post('/user', authorization, UserController.store)
router.delete('/user/:id', authorization, UserController.delete)

module.exports = router