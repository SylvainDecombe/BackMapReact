const { Schema, model } = require('mongoose');

const ManufacturerModel = Schema({

    firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
    },
    password: {
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
	}

});

module.exports = model('Manufacturer', ManufacturerModel);