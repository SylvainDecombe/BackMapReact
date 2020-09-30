const db = require ('../models/mongoose');
const crud = db.crud;

exports.create = (req, res) => {
    if (!req.body.nom)
    {
        res.status(400).send({ message : "Le champ le doit pas être vide !"});
        return;
    }
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
    .catch(err =>({
        message: err.message || "Une erreur s'est produit lors de l'ajout de l'utilisateur dans la base de données !"
    }));
