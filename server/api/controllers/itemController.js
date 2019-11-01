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

exports.list_by_user = async (req, res) => {
    const userId = req.params.userId;

    try {

        let page = parseInt(req.query.page) || 0;
        let limit = parseInt(req.query.limit) || 2;

        const items = await Item.find({ owner: userId })
                                .populate('owner', 'name lastName -_id')
                                .skip(page * limit)
                                .limit(limit)
                                .sort({ created: -1 });

        const cont = await Item.countDocuments({owner: userId});

        res.json({items, cont});
    } catch (err) {
        if (err.kind == 'ObjectId') {
            res.status(500).json({'error': `invalid user ${userId}`});
        }
        console.log("item error", err);
        res.status(500).json({'error': `items can't be got `});
    }
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
        if (err){
            if (err.kind == 'ObjectId') {
                res.json({});
            } else {
                res.send(err);
            }
        }
            
        res.json(item);
    });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {       
        const query = await Item.findOneAndRemove({ _id: id });
        res.json({msg: `item ${id} deleted`});
    } catch (err) {
        console.error('error delete', err);
        if (err.kind == 'ObjectId') {
            res.status(500).json({'error': `invalid id ${id}`});
        }
        res.status(500).json({'error': `item ${id} can't be deleted`});
    }
};