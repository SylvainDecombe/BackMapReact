const db = require('../core/mongoose');
const User = require('../models/UserModel');

const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Le champ le doit pas être vide !" });
        return;
    }

    // Creation utilisateur
    const user = new user({
        nom: req.body.nom,
        desc: req.body.desc,
        published: req.body.published ? req.body.published : false
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

//Recherche par id
const findOne = (req, res) => {
    const id = req.params.id;

    user.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Aucun résultat par ID ! + id" });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur: " + id })
        })
};

//MAJ par id

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données n'ont pas été mises à jour !"
        });
    }
    const id = req.params.id;

    user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

//Supression CRUD par ID
const deleteUser = (req, res) => {
    const id = req.params.id;

    usesr.findByIdAndRemove(id, { useFindAndModify: false })
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
};

//Tous supprimer
const deleteAll = (req, res) => {
    user.deleteMany({})
        .then(data => {
            res.send({
                message: "{data.deletedCount} Tous a été supprimé avec succès !"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur, impossible de supprimer tous les élements !"
            });
        });
};

module.exports = { create, update, findAll, deleteUser };