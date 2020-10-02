const { Router } = require('express');
const { create, update, deleteUser, findAll } = require('../controllers/UserController');
const router = Router();

//creation utilisateur
router.post("/user", create);
//MAJ profile
router.put("/user/:id", update);
//supression par id
router.delete("/user/:id", deleteUser);
//supprimer tous utilisateur
router.get("/user", findAll);

<<<<<<< HEAD
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
=======
module.exports = router;
>>>>>>> 11090a596daa76323bb1c8f6dc1753e55850c4d3
