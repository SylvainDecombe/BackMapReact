const db = require('../core/mongoose');

///////////////////////
//Import du User Model
///////////////////////
const User = require('../models/UserModel');

/////////////////////
//Création d'un User
/////////////////////
const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Le champ le doit pas être vide !" });
        return;
    }
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        motdepasse: req.body.motdepasse,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        postal: req.body.postal,
        ville: req.body.ville,
        role: req.body.role,

    });

    // Sauvegarde utilisateur MongoDB
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produit lors de l'ajout de l'utilisateur dans la base de données !"
            });
        });
};

/////////////////////////////////
//Récupération de tous les Users
/////////////////////////////////
const findAll = (req, res) => {

    const user = User
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

//////////////////////////////////////
//Récupération d'un User selon son id
//////////////////////////////////////
const findOne = (req, res) => {
    const id = req.params.id;

    const user = User
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

//////////////////////////////////////////
//Modification des informations d'un User
//////////////////////////////////////////
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données n'ont pas été mises à jour !"
        });
    }
    const id = req.params.id;

    const user = User
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

///////////////////////
//Supression d'un User
///////////////////////
const deleteUser = (req, res) => {
    const id = req.params.id;

    const user = User
        .findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    log: data,
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
};

module.exports = { create, update, findAll, deleteUser };