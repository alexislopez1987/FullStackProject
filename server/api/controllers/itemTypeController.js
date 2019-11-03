var mongoose = require('mongoose'),
ItemType = mongoose.model('ItemType');

exports.list_all_item_types = async (req, res) => {

    try {
        const types = await ItemType.find({});
        res.json(types);
    } catch (err) {
        res.status(500).json({'error': `item types can't be got`});
    }
};