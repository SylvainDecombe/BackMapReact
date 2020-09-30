module.exports = app => {
    const crud = require ("../controllers/CrudController.js");

    var router = require ("express").Router();

    //creation utilisateur
    router.post("/", crud.create);
    //MAJ profile
    router.get("/:id", crud.update);
    //supression par id
    router.get("/:id", crud.delete);
    //supprimer tous utilisateur
    router.get("/", crud.deleteAll);
    
    app.use("/api/crud", router);
};