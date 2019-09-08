'use strict';
module.exports = function (app) {
    var itemList = require('../controllers/itemController');

    app.route('/items')
        .get(itemList.list_all_items);

    app.route('/item')
        .post(itemList.save_item);

    /*
    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
    */
};