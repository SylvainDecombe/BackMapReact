const dotenv = require('dotenv');
const express = require('express');
const faker = require('faker');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dbconnect = require('./core/config');

/////////////////////////////
//Import des routes de l'API
/////////////////////////////
const auth = require('./routes/AuthRouter');
const cust = require('./routes/CustomerRouter');
const manu = require('./routes/ManufacturerRouter');
const user = require('./routes/UserRouter');
const { connect } = require('mongoose');

dotenv.config();
dbconnect.dbconnect();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//////////////////////////
//Routes racines de l'API
//////////////////////////
app.use('/api', manu);
app.use('/api', cust);
app.use('/api', user);
app.use('/api/auth', auth);
//////////////////////////////
//Configuration port d'écoute
//////////////////////////////
app.listen(8081, () => console.log('Server starting'));
