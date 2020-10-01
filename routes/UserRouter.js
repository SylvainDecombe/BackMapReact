module.exports = app => {
    const user = require ("../controllers/UserController.js");

    var router = require ("express").Router();

    //creation utilisateur
    router.post("/", create);
    //MAJ profile
    router.put("/:id", update);
    //supression par id
    router.de("/:id", delete);
    //supprimer tous utilisateur
    router.get("/", deleteAll);
    
    app.use("/api/user", router);
};