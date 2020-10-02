const { Schema, model } = require('mongoose');

const UserModel = Schema({

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
        required: true
	},
	pays: {
        type: String,
        required: true
	},
	posx: {
        type: String,
        required: false
    },
    posy: {
        type: String,
        required: false
    }

});

module.exports = model('User', UserModel);
