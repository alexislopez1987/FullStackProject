'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: 'Item name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: 'Item price is required'
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an owner'
    },
    type: {
        type: mongoose.Schema.ObjectId,
        ref: 'ItemType',
        required: 'You must supply an item type'
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

ItemSchema.index({
    name: 'text'
});

module.exports = mongoose.model('Item', ItemSchema);
