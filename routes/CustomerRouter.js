const { Router } = require('express');
const {  getByToken } = require('../controllers/CustomerController');
const { validateToken } = require('../controllers/AuthController');
const { create, update, deleteCustomer, findAll } = require('../controllers/CustomerController');

const router = Router();

//CLIENT
//creation client
router.post("/customer/", create);
//MAJ profile
router.put("/customer/:id", update);
//supression par id
router.delete("/customer/:id", deleteCustomer);
//supprimer tous client
router.get("/customer/", findAll);

module.exports = router;