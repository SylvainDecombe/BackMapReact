const { json } = require('express');
const db = require('../core/mongoose');

///////////////////////////
//Import du Customer Model
///////////////////////////
const Customer = require('../models/CustomerModel');

/////////////////////////
//Création d'un Customer
/////////////////////////
const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Le champ le doit pas être vide !" });
        return;
    }
    const client = new Customer({
        prenom: req.body.prenom,
        nom: req.body.nom,
        tel: req.body.tel,
        adresse: req.body.adresse,
        postal: req.body.postal,
        pays: req.body.pays,
        ville: req.body.ville,
        posx: req.body.posx,
        posy: req.body.posy
    });

    // Sauvegarde Customer MongoDB
    client
        .save(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produit lors de l'ajout de l'utilisateur dans la base de données !"
            });
        });
};

/////////////////////////////////////
//Récupération de tous les Customers
/////////////////////////////////////
const findAll = (req, res) => {

    const client = Customer
        .find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Impossible de retourner tous les élements dans la base de données !"
            });
        });
};

//////////////////////////////////////////
//Récupération d'un Customer selon son id
//////////////////////////////////////////
const findOne = (req, res) => {
    const id = req.params.id;

    const client = Customer
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Aucun résultat par ID ! + id" });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur: " + id })
        })
};

//////////////////////////////////////////////
//Modification des informations d'un Customer
//////////////////////////////////////////////
const update = async(req, res) => {
    const id = req.body.id;
    const body = req.body;
    if (id) {
        try {
            const customerToUpdate = await Customer.findOne({ _id: id });
            if (customerToUpdate) {
                delete body._id;
                await Customer.findOneAndUpdate({ _id: id }, body);
                const updatedCustomer = await Customer.findOne({ _id: id });
                return res.json(updatedCustomer);
            } else {
                return res.status(404).send({
                    message: 'Customer not found.'
                });
            }
        } catch (e) {
            return res.status(500).send({
                message: e
            });
        }
    } else {
        return res.status(400).send({
            message: 'No ID specified.'
        });
    }
};

///////////////////////////
//Supression d'un Customer
///////////////////////////
const deleteCustomer = async function(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const customerToDelete = await Customer.findOne({ _id: id });
            if (customerToDelete) {
                await customerToDelete.delete();
                return res.sendStatus(200);
            } else {
                return res.status(404).send({
                    message: 'Customer not found.'
                });
            }
        } catch (e) {
            return res.status(500).send({
                message: e
            });
        }
    } else {
        return res.status(400).send({
            message: 'No ID specified.'
        });
    }
};

module.exports = { create, update, findAll, deleteCustomer };