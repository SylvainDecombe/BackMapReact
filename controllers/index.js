const { response, json } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const genereteToken = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '48h' }, (error, token) => {
            if (error) {
                reject('Error generate token');
            } else {
                resolve(token);
            }
        })
    });
}

const validateToken = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({ message: 'Token has not send' });
    }
    try {
        const {  uid, name } = jwt.verify(token, process.env.SECRET_TOKEN);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
    next()
}

const encryptPassword = async(password) => {
    if (password) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    } else {
        return 'Error password';
    }
}

const register = async(req, res) => {
    const user = req.body;
    const email = user.email;
    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(400).json({ message: 'Account already exist' })
    }
    user.password = await encryptPassword(user.password);
    const new_user = new User(user);
    await new_user.save();
    const token = await genereteToken(user._id, user.name);
    return res.status(200).json({ name: user.name, uid: user._id, token: token })
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            const token = await genereteToken(user._id, user.name);
            return res.status(200).json({ name: user.name, uid: user._id, token: token })
        } else {
            return res.status(500).json({ message: 'Credentials error' });
        }
    } catch (error) {
        if (error) {
            return res.status(500).json({ error: error });
        }
    }
}

module.exports = {  register, login, validateToken };