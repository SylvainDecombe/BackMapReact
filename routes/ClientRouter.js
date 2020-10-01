module.exports = app => {
    const client = require ("../controllers/ClientController.js");

    var router = require ("express").Router();

    //CLIENT
    //creation utilisateur
    router.post("/client/", crud.create);
    //MAJ profile
    router.get("/client/:id", crud.update);
    //supression par id
    router.get("/client/:id", crud.delete);
    //supprimer tous utilisateur
    router.get("/client/", crud.deleteAll);
    
    app.use("/api/client", router);
};