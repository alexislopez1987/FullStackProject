var mongoose = require('mongoose'),
    User = mongoose.model('User');
const Joi = require('@hapi/joi');

exports.list_all_users = function (req, res) {
    User.find({}).
    populate({
        path: 'items',
        model: 'Item'
    }).
    exec(function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

const validationUserSchema = Joi.object({
    name: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

exports.save_user = async (req, res) => {

    const {error} = validationUserSchema.validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const userToSave = new User({
        name,
        email,
        lastName,
        password
    });

    try {
        const savedUser = await userToSave.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

    /*
    userToSave.save(function (err, user) {
        if (err)
            res.status(400).send(err);
        res.json(user);
    });
    */
};