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
const update = async(req, res) => {
    const id = req.body.id;
    const body = req.body;
    if (id) {
        try {
            const userToUpdate = await User.findOne({ _id: id });
            if (userToUpdate) {
                delete body._id;
                await User.findOneAndUpdate({ _id: id }, body);
                const updatedUser = await User.findOne({ _id: id });
                return res.json(updatedUser);
            } else {
                return res.status(404).send({
                    message: 'User not found.'
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

///////////////////////
//Supression d'un User
///////////////////////
const deleteUser = async function(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const userToDelete = await User.findOne({ _id: id });
            if (userToDelete) {
                await userToDelete.delete();
                return res.sendStatus(200);
            } else {
                return res.status(404).send({
                    message: 'User not found.'
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

module.exports = { create, update, findAll, deleteUser };