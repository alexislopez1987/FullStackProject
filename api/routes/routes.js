'use strict';
var express = require('express')
var router = express.Router()

var itemController = require('../controllers/itemController');
var userController = require('../controllers/userController');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/user', function (req, res) {
    userController.list_all_users(req, res);
})

router.post('/user', function (req, res) {
    userController.save_user(req, res);
})

router.get('/item', function (req, res) {
    itemController.list_all_items(req, res);
})

router.post('/item', function (req, res) {
    itemController.save_item(req, res);
})

module.exports = router