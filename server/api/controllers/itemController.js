'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Item');


exports.list_all_items = function (req, res) {
    Item.find({}).
    populate('owner', 'name lastName -_id').
    exec(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.save_item = function (req, res) {

    const name = req.body.name;
    const price = req.body.price;
    const owner = req.body.owner;

    const itemToSave = new Item({
        name,
        price,
        owner
    });

    itemToSave.save(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.item_detail = function (req, res) {

    const id = req.params.id;

    console.log("id", id);

    Item.findById(id).
    populate('owner', 'name lastName -_id').
    exec(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};