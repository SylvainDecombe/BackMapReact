module.exports = app => {
    const user = require ("../controllers/UserController.js");

    var router = require ("express").Router();

    //creation utilisateur
    router.post("/", crud.create);
    //MAJ profile
    router.put("/:id", crud.update);
    //supression par id
    router.delete("/:id", crud.delete);
    //supprimer tous utilisateur
    router.get("/", crud.deleteAll);
    
    app.use("/api/crud", router);
};