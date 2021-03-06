const express = require('express')
const passport = require('passport')
const controller = require('../controllers/product')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.post('/new', passport.authenticate('jwt', {session: false}), controller.create)

module.exports = router