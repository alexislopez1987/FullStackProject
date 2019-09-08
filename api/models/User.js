'use strict';
var mongoose = require('mongoose');
var validator = require('validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid user email'],
        required: 'User email is required'
    },
    name: {
        type: String,
        required: 'User name is required',
        trim: true
    },
    lastName: {
        type: String,
        required: 'User last name is required',
        trim: true
    },
    items: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Item'
    }]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

userSchema.virtual('fullName').get(function () {
    return this.name + ' ' + this.lastName;
});

module.exports = mongoose.model('User', userSchema);