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
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données n'ont pas été mises à jour !"
        });
    }
    const id = req.params.id;

    const client = Customer
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Impossible d'effectuer la MAJ"
                });
            } else res.send({ message: "Le pass CRUD a bien été MAJ !" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur de MAJ.."
            });
        });
};

///////////////////////////
//Supression d'un Customer
///////////////////////////
const deleteCustomer = (req, res) => {
    const id = req.params.id;

    const client = Customer
        .findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Erreur s'est produit lors de la supression d'un id !"
                });
            } else {
                res.send({
                    message: "La supression a été un succès !"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur, impossible de supprimer l'élément par id"
            });
        });
}

module.exports = { create, update, findAll, deleteCustomer };