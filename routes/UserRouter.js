const { Router } = require('express');
const { create, update, deleteUser, findAll } = require('../controllers/UserController');
const router = Router();

//USER
//creation utilisateur
router.post("/user", create);
//MAJ profile
router.put("/user", update);
//supression par id
router.delete("/user/:id", deleteUser);
//Afficher tous les utilisateurs
router.get("/user", findAll);

module.exports = router;