module.exports = app => {
    const manufacturer = require ("../controllers/ManufacturerController.js");

    var router = require ("express").Router();

    //FABRICANT
    //creation utilisateur
    router.post("/manufacturer/", manufacturer.create);
    //MAJ profile
    router.get("/manufacturer/:id", manufacturer.update);
    //supression par id
    router.get("/manufacturer/:id", manufacturer.delete);
    //supprimer tous utilisateur
    router.get("/manufacturer/", manufacturer.deleteAll);
    
    app.use("/api/manufacturer", router);
};