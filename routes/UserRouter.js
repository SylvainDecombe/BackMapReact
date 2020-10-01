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

module.exports = router;