var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.list_all_users = function (req, res) {
    User.find({}).
    populate({path: 'items', model: 'Item'}).
    exec(function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.save_user = function (req, res) {

    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.lastName;

    const userToSave = new User({
        name,
        email,
        lastName
    });

    userToSave.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};