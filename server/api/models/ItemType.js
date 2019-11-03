let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ItemTypeSchema = new Schema({
    name: {
        type: String,
        required: 'Item type name is required'
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

module.exports = mongoose.model('ItemType', ItemTypeSchema);