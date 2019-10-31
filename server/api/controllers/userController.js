var mongoose = require('mongoose'),
    User = mongoose.model('User');
const validation = require('../models/validation');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

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

exports.register = async (req, res) => {

    const {
        error
    } = validation.registerValidation(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const emailExist = await User.findOne({
        email: email
    });
    if (emailExist)
        return res.status(400).json({
            'error': 'Email already exists'
        });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userToSave = new User({
        name,
        email,
        lastName,
        password: hashedPassword
    });

    try {
        const savedUser = await userToSave.save();
        res.json({
            user: savedUser._id
        });
    } catch (err) {
        res.status(400).json(err);
    }

    /*
    userToSave.save(function (err, user) {
        if (err)
            res.status(400).send(err);
        res.json(user);
    });
    */
};

exports.login = async (req, res) => {
    const {
        error
    } = validation.loginValidation(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user)
        return res.status(400).json({
            'error': 'Email or password is wrong'
        });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).json({
            'error': 'Invalid password'
        });

    const minutes = 10 * 60; 
    const payload = {
        user : {
            id: user._id
        }
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: minutes
    }, (err, token) => {
        if (err) {
            throw err;
        } else {
            res.header('auth-token', token);
            res.header('expiresIn', minutes);
            return res.json(getObjectUser(user));
        }
    });
}

exports.user_by_id = async (req, res) => {
    const userId = req.user.id;
    try {  
        const user = await User.findById(userId);
        res.json(getObjectUser(user));
    } catch (err) {
        if (err.kind == 'ObjectId') {
            res.status(500).json({'error': `invalid user ${userId}`});
        }
        res.status(500).json({'error': `user can't be got`});
    }
}

const getObjectUser = (mongoUser) => {
    let user = mongoUser.toObject();
    delete user.password; 
    delete user.__v;
    delete user._id;
    delete user.fullName;

    return user;
}