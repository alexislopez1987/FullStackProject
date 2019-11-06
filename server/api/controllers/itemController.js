'use strict';

var mongoose = require('mongoose'),
    Item = mongoose.model('Item');
const moment = require('moment');

exports.list_all_items = function (req, res) {

    const populateQuery = [{path:'owner', select:'name lastName -_id'}, {path:'type', select:'name _id'}];

    Item.find({}).
    populate(populateQuery).
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
        let nameSearch = req.query.search || '';

        let filter = { owner: userId };
        
        if (nameSearch !== '') {
            filter.name = { $regex: nameSearch, $options: 'i' };
        }

        const populateQuery = [{path:'owner', select:'name lastName'}, {path:'type', select:'name _id'}];

        const items = await Item.find(filter)
                                .populate(populateQuery)
                                .skip(page * limit)
                                .limit(limit)
                                .sort({ created: -1 });

        const cont = await Item.countDocuments(filter);

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
    const type = req.body.type;

    const itemToSave = new Item({
        name,
        price,
        owner,
        type
    });

    itemToSave.save(function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.item_detail = function (req, res) {

    const id = req.params.id;
    const populateQuery = [{path:'owner', select:'name lastName -_id'}, {path:'type', select:'name _id'}];

    Item.findById(id).
    populate(populateQuery).
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

exports.update = async (req, res) => {
    const id = req.body.id;
    try {     
        const name = req.body.name;
        const price = req.body.price;
        const type = req.body.type;

        const query = await Item.findByIdAndUpdate({ _id: id }, { name, price, type });
        res.json({msg: `item ${id} updated`});
    } catch (err) {
        if (err.kind == 'ObjectId') {
            res.status(500).json({'error': `invalid id ${id}`});
        }
        res.status(500).json({'error': `item ${id} can't be updated`});
    }
};

exports.items_by_date = async (req, res) => {
    const userId = req.user.id;

    try {
        let from = req.query.from || '';
        let to = req.query.to || '';
        let filter = { owner: userId };
        let filterDates = {};

        if (from !== '') {
            filterDates["$gte"] = moment(from, 'YYYY/MM/DD');
        }

        if (to !== '') {
            filterDates["$lte"] = moment(to, 'YYYY/MM/DD');
        }

        if (!isEmpty(filterDates)) {
            filter.created = filterDates;
        }

        const populateQuery = [{path:'owner', select:'name lastName'}, {path:'type', select:'name _id'}];

        const items = await Item.find(filter)
                                .populate(populateQuery)
                                .sort({ created: -1 })
                                .lean();

        res.json(items);

    } catch (err) {
        if (err.kind == 'ObjectId') {
            res.status(500).json({'error': `invalid user ${userId}`});
        }
        res.status(500).json({'error': `items by dates can't be got `});
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}