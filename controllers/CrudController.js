const db = require ('../models/mongoose');
const crud = db.crud;

exports.create = (req, res) => {
    if (!req.body.nom)
    {
        res.status(400).send({ message : "Le champ le doit pas être vide !"});
        return;
    }

// Creation utilisateur
const crud = new crud({
    nom: req.body.nom,
    desc: req.body.desc,
    published: req.body.published ? req.body.published : false
});

// Sauvegarde utilisateur MongoDB
crud
    .save(crud)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Une erreur s'est produit lors de l'ajout de l'utilisateur dans la base de données !"
    });
  });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {$regex: new RegExp(title), $options: "o"}} : {};

    crud.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Impossible de retourner tous les élements dans la base de données !"
        });
    });
};

//Recherche par id
exports.findOne = (req, res) => {
    const id = req.params.id;

    crud.findAById(id)
    .then(data =>{
        if (!data)
        res.status(404).send({ message: "Aucun résultat par ID ! + id"});
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Erreur: " + id})
    })
};

//MAJ par id

exports.update = (req, res) => {
    if (!req.body){
        return res.status(400).send({
            message : "Les données n'ont pas été mises à jour !"
        });
    }
    const id = req.params.id;

    crud.findAByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data){
            res.status(404).send({
                message: "Impossible d'effectuer la MAJ"
            });
        }else res.send({ message: "Le pass CRUD a bien été MAJ !"});
    })
    .catch(err => {
        res.status(500).send({
            message: "Erreur de MAJ.."
        });
    });
};

//Supression CRUD par ID
exports.delete = (req, res =>{
    const id = req.params.id;

    crud.findAByIdAndRemove(id, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: "Erreur s'est produit lors de la supression d'un id !"
            });
        } else {
            res.send({
                message : "La supression a été un succès !"
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message : "Erreur, impossible de supprimer l'élément par id"
        });
    });
});

//Tous supprimer
exports.deleteAll = (req, res => {
    crud.deleteMany({})
    .then(data => {
        res.send({
            message : "{data.deletedCount} Tous a été supprimé avec succès !"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Erreur, impossible de supprimer tous les élements !"
        });
    });
});

