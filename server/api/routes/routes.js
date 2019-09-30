'use strict';
var express = require('express')
var router = express.Router()
const verifyToken = require('./verifyToken');

var itemController = require('../controllers/itemController');
var userController = require('../controllers/userController');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/user', verifyToken, function (req, res) {
    console.log(req.user);
    userController.list_all_users(req, res);
})

router.post('/register', function (req, res) {
    userController.register(req, res);
})

router.post('/login', function (req, res) {
    userController.login(req, res);
})

router.get('/item', function (req, res) {
    itemController.list_all_items(req, res);
})

router.post('/item', function (req, res) {
    itemController.save_item(req, res);
})

module.exports = router