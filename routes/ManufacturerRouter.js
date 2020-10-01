module.exports = app => {
    const manufacturer = require ("../controllers/ManufacturerController.js");

    var router = require ("express").Router();

    //FABRICANT
    //creation utilisateur
    router.post("/manufacturer/", create);
    //MAJ profile
    router.put("/manufacturer/:id", update);
    //supression par id
    router.delete("/manufacturer/:id", deleteManufacturer);
    //supprimer tous utilisateur
    router.get("/manufacturer/", findAll);
    
    app.use("/api/manufacturer", router);
};