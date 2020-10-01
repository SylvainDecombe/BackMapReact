module.exports = app => {
    const manufacturer = require ("../controllers/ManufacturerController.js");

    var router = require ("express").Router();

    //FABRICANT
    //creation utilisateur
    router.post("/manufacturer/", crud.create);
    //MAJ profile
    router.get("/manufacturer/:id", crud.update);
    //supression par id
    router.get("/manufacturer/:id", crud.delete);
    //supprimer tous utilisateur
    router.get("/manufacturer/", crud.deleteAll);
    
    app.use("/api/manufacturer", router);
};