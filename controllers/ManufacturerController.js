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
const update = async(req, res) => {
    const id = req.body.id;
    const body = req.body;
    if (id) {
        try {
            const manufacturerToUpdate = await Manufacturer.findOne({ _id: id });
            if (manufacturerToUpdate) {
                delete body._id;
                await Manufacturer.findOneAndUpdate({ _id: id }, body);
                const updatedManufacturer = await Manufacturer.findOne({ _id: id });
                return res.json(updatedManufacturer);
            } else {
                return res.status(404).send({
                    message: 'Manufacturer not found.'
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

///////////////////////////////
//Supression d'un Manufacturer
///////////////////////////////
const deleteManufacturer = async(req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const manufacturerToDelete = await Manufacturer.findOne({ _id: id });
            if (manufacturerToDelete) {
                await manufacturerToDelete.delete();
                return res.sendStatus(200);
            } else {
                return res.status(404).send({
                    message: 'Manufacturer not found.'
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

module.exports = { create, update, findAll, deleteManufacturer };