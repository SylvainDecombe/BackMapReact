const router = require("express").Router();
const manufacturer = require("../controllers/ManufacturerController.js");
const { create, update, deleteManufacturer, findAll } = require('../controllers/ManufacturerController');

//FABRICANT
//afficher tous les manufacturers
router.get("/manufacturer", findAll);
//creation manufacturers
router.post("/manufacturer", create);
//MAJ profile
router.put("/manufacturer/:id", update);
//supression par id
router.delete("/manufacturer/:id", deleteManufacturer);

module.exports = router;