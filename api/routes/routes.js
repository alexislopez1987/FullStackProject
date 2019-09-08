'use strict';
module.exports = function (app) {
    var itemController = require('../controllers/itemController');
    var userController = require('../controllers/userController');

    app.route('/item')
        .get(itemController.list_all_items)
        .post(itemController.save_item);

    app.route('/user')
        .get(userController.list_all_users)
        .post(userController.save_user);

    /*
    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
    */
};