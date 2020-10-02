const { Schema, model } = require('mongoose');

const UserModel = Schema({

    prenom: {
        type: String,
        required: false
    },
    nom: {
        type: String,
        required: false
    },
    motdepasse: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    tel: {
        type: String,
        required: false
    },
    adresse: {
        type: String,
        required: false
    },
    postal: {
        type: Number,
        required: false
    },
    ville: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    }

});

module.exports = model('User', UserModel);
