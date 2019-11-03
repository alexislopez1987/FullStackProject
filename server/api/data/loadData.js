const fs = require('fs');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ItemType = require('../models/ItemType');
const User = require('../models/User');
const Item = require('../models/Item');

let itemTypes = JSON.parse(fs.readFileSync(__dirname + '/itemType.json', 'utf-8'));

let users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

users.forEach(function (user, index) {
	const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
});

let items = JSON.parse(fs.readFileSync(__dirname + '/items.json', 'utf-8'));
//const distinctOwners = [...new Set(items.map(x => x.owner))];

exports.loadData = async function loadData() {
    try {
        let itemsToInsert = [];

        console.log("inserting data...");

        await ItemType.insertMany(itemTypes);
        const insertItemTypes = await ItemType.find({});

        await User.insertMany(users);

        const insertedUsers = await User.find({});

        insertedUsers.forEach(function (user, index) {

            let itemsByUser = items.filter(function (el) {
                return el.owner ===  user.email;
            });

            itemsByUser.forEach(function (item, index) {

                let relatedType = insertItemTypes.filter(function (el) {
                    return el.name ===  item.type;
                });

                item.created = new Date();
                item.owner = user._id;
                item.type = relatedType[0].id,
                itemsToInsert.push(item);
            });
        });

        await Item.insertMany(itemsToInsert);
        console.log("data inserted");
    } catch (e) {
        console.log("error trying to insert data");
        console.error(e);
    } 
}
