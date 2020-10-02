//const mongoose = require('mongoose');

//const dbconnnect = async() => {
//    try {
//        mongoose.connect(process.env.DB_CONNECT, {
//                useNewUrlParser: true,
//                useUnifiedTopology: true
//            },
//            () => console.log("Mongo ok")
//        );
//    } catch (error) {
//        throw new Error('Mongo KO');
//    }
//}
const db = require('../core/config');
const faker = require('faker');
const Collaborator = require('../models/ManufacturerController');
const User = require('../models/UserModel');
const Customer = require('../models/CustomerModel');

exports.populateUsers = async function (res) {
    try {
        for (let i = 0; i < 100; i++) {
            const user = new User();
            user.nom = faker.name.firstName();
            user.motdepasse = faker.password.password();
            user.email = faker.internet.email().toLowerCase();
            user.tel = faker.phone.phoneNumber();
            user.adresse = faker.address.streetName();
            user.postal = faker.address.zipCode();
            user.ville = faker.address.city();
            user.pays = faker.address.country();
            user.posx = faker.address.latitude();
            user.posy = faker.address.longitude();
            user.role = _randomRole();
            await user.save();
        }
        return true;
    } catch (e) {
        return res.status(500).json({message: e});
    }
};

exports.populateCustomers = async function (res) {
    try {
        for (let i = 0; i < 100; i++) {
            const customers = new Customers();
            customers.prenom = faker.name.firstName();
            customers.nom = faker.name.lastName();
            customers.tel = faker.phone.phoneNumber();
            customers.adresse = faker.address.streetName();
            customers.postal = faker.address.zipCode();
            customers.pays = faker.address.country();
            customers.ville = faker.address.city();
            customers.posx = faker.address.latitude();
            customers.posy = faker.address.longitude();
            const TYPE = ["CUSTOMER"];
            await customers.save();
        }
        return true;
    } catch (e) {
        return res.status(500).json({message: e});
    }
};

exports.populateManufacturer = async function (res) {
    try {
        for (let i = 0; i < 100; i++) {
            const Manufacturer = new Manufacturer();
            Manufacturer.nom = faker.company.companyName();
            Manufacturer.email = faker.internet.email().toLowerCase();
            Manufacturer.tel = faker.phone.phoneNumber();
            Manufacturer.adresse = faker.address.streetName();
            Manufacturer.postal = faker.address.zipCode();
            Manufacturer.ville = faker.address.city();
            Manufacturer.pays = faker.address.country();
            Manufacturer.siret = _generateSiret();
            Manufacturer.posx = faker.address.latitude();
            Manufacturer.posy = faker.address.longitude();
            const TYPE = ["MANUFACTURER"];
            await customers.save();
        }
        return true;
    } catch (e) {
        return res.status(500).json({message: e});
    }
};

function _randomRole() {
    const ROLES = ['ADMIN', 'EDITOR', 'USER'];
    return ROLES[Math.floor(Math.random() * 3)];
}

function _generateSiret() {
    let number = '000';
    for (let i = 0; i < 8; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}