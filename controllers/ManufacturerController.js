const db = require('../core/mongoose');

///////////////////////////////
//Import du Manufacturer Model
///////////////////////////////
const Manufacturer = require('../models/ManufacturerModel');

/////////////////////////////
//Création d'un Manufacturer
/////////////////////////////
const create = (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Le champ le doit pas être vide !" });
        return;
    }
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

    // Sauvegarde Manufacturer MongoDB
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

/////////////////////////////////////////
//Récupération de tous les Manufacturers
/////////////////////////////////////////
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


//////////////////////////////////////////////
//Récupération d'un Manufacturer selon son id
//////////////////////////////////////////////
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

//////////////////////////////////////////////////
//Modification des informations d'un Manufacturer
//////////////////////////////////////////////////
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

///////////////////////////////
//Supression d'un Manufacturer
///////////////////////////////
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

module.exports = { create, update, findAll, deleteManufacturer };