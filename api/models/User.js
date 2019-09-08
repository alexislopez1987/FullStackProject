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
    }
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

userSchema.virtual('items', {
    ref: 'Item', 
    localField: '_id', 
    foreignField: 'owner' 
});

function autopopulate(next) {
    this.populate('items');
    next();
}

userSchema.pre('find', autopopulate);
userSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('User', userSchema);