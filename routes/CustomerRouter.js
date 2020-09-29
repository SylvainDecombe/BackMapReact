const { Router } = require('express');
const {  getByToken } = require('../controllers/CustomerController');
const { validateToken } = require('../controllers/AuthController');

const router = Router();

router.get('/customer', [validateToken], getByToken);
//router.post('/customers', postCustomer);

module.exports = router;