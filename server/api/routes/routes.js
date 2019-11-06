'use strict';
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const verifyToken = require('./verifyToken');

const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const itemTypeController = require('../controllers/itemTypeController');

const options = {
    swaggerDefinition: {
      info: {
        title: 'Personal Finances API',
        version: '1.0.0',
        description: 'Doc for apis',
        contact: {
            name: "Alexis Lopez"
        }
      },
    },
    apis: ['api/routes/routes.js']
};

const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/users', verifyToken, function (req, res) {
    userController.list_all_users(req, res);
})

router.get('/user', verifyToken, function (req, res) {
    userController.user_by_id(req, res);
})

router.post('/register', function (req, res) {
    userController.register(req, res);
})

router.post('/login', function (req, res) {
    userController.login(req, res);
})

/**
 * @swagger
 * /api/v1/item:
 *    get:
 *      description: This should return all items
 *      responses:
 *        '200':
 *          description: A successful response
 *      tags:
 *       - items
 */
router.get('/items', function (req, res) {
    itemController.list_all_items(req, res);
})

router.get('/item/:userId', function (req, res) {
    itemController.list_by_user(req, res);
})

router.post('/item', function (req, res) {
    itemController.save_item(req, res);
})

router.get('/itemdetail/:id', function (req, res) {
    itemController.item_detail(req, res);
})

router.delete('/item/:id', (req, res) => {
    itemController.delete(req, res);
})

router.put('/item', (req, res) => {
    itemController.update(req, res);
})

router.get('/dashboard', verifyToken, function (req, res) {
    itemController.items_by_date(req, res);
})

router.get('/itemtype', function (req, res) {
    itemTypeController.list_all_item_types(req, res);
})

module.exports = router