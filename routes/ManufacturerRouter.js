const router = require("express").Router();
const manufacturer = require("../controllers/ManufacturerController.js");
const { create, update, deleteManufacturer, findAll } = require('../controllers/ManufacturerController');



//FABRICANT
router.get("/manufacturer", findAll);
//creation utilisateur
router.post("/manufacturer", create);
//MAJ profile
router.put("/manufacturer/:id", update);
//supression par id
router.delete("/manufacturer/:id", deleteManufacturer);
//supprimer tous utilisateur

module.exports = router;