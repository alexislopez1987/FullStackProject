'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {
        type: String,
        required: 'Name price is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: 'Item price is required'
    }
});

module.exports = mongoose.model('Items', ItemSchema);