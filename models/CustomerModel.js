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
    ville: {
        type: String,
        required: true
    }
});

module.exports = model('Customer', CustomerModel);