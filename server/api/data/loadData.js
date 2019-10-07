const fs = require('fs');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Item = require('../models/Item');

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
        await User.insertMany(users);

        const insertedUsers = await User.find({});

        insertedUsers.forEach(function (user, index) {

            let itemsByUser = items.filter(function (el) {
                return el.owner ===  user.email;
            });

            itemsByUser.forEach(function (item, index) {
                item.created = new Date();
                item.owner = user._id;
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
