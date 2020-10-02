const { Router } = require('express');
const { create, update, deleteCustomer, findAll } = require('../controllers/CustomerController');

const router = Router();

//CUSTOMER
//creation customer
router.post("/customer/", create);
//MAJ profile
router.put("/customer/:id", update);
//supression par id
router.delete("/customer/:id", deleteCustomer);
//afficher tous les customers
router.get("/customer", findAll);

module.exports = router;