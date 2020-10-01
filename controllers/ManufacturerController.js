const db = require('../core/mongoose');
const Manufacturer = require('../models/ManufacturerModel');

const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Le champ le doit pas être vide !" });
        return;
    }

    // Creation utilisateur
    const manufacturer = new Manufacturer({
        nom: req.body.nom,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        postal: req.body.postal,
        ville: req.body.ville,
        pays: req.body.pays,
        siret: req.body.siret,
        posx: req.body.posx,
        posy: req.body.posy
    });

    // Sauvegarde utilisateur MongoDB
    manufacturer
        .save(manufacturer)
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

    const manufacturer = Manufacturer
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

    const manufacturer = Manufacturer
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

//MAJ par id

const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Les données n'ont pas été mises à jour !"
        });
    }
    const id = req.params.id;

    const manufacturer = Manufacturer
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

//Supression CRUD par ID
const deleteManufacturer = (req, res) => {
    const id = req.params.id;

    const manufacturer = Manufacturer
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
};

//Tous supprimer
const deleteAll = (req, res) => {
    manufacturer.deleteMany({})
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


module.exports = { create, update, findAll, deleteManufacturer };