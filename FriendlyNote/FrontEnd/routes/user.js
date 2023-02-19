const express = require('express'); //import express


const router = express.Router();

const userController = require('../controllers/user');

router.post('/user', userController.newUser)

//router.delete('/user/:id', userController.deleteUser)

router.get('/user', userController.getAllUser)

router.post('/user/login', userController.login)

module.exports = router;