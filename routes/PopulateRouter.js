const { Router } = require('express');
const { populateUsers } = require('../core/mongoose');

const router = Router();

router.get('/mogoose/user', populateUsers);

module.exports = router;