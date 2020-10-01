const { Schema, model } = require('mongoose');

const UserModel = Schema({

    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    postal: {
        type: Number,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

});

module.exports = model('User', UserModel);