'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Items');


exports.list_all_items = function (req, res) {
    Item.find({}, function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.save_item = function (req, res) {

    const itemName = req.body.name;
    const itemPrice = req.body.price;
    const itemToSave = new Item({
        name: itemName,
        price: itemPrice
    });

    itemToSave.save(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};