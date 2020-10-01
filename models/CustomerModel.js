const { Schema, model } = require('mongoose');

const CustomerModel = Schema({
    prenom: {
        type: String,
        required: true
    },
    nom: {
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
    pays: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    posx: {
        type: String,
        required: true
    },
    posy: {
        type: String,
        required: true
    }
});

module.exports = model('Customer', CustomerModel);