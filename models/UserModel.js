const { Schema, model } = require('mongoose');

const UserModel = Schema({

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
	pays: {
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

module.exports = model('User', UserModel);