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

dotenv.config();
dbconnect.dbconnect();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
//////////////////////////
//Routes racines de l'API
//////////////////////////
app.use('/api/auth', auth);
app.use('/api', cust);
//////////////////////////////
//Configuration port d'écoute
//////////////////////////////
app.listen(8081, () => console.log('Server starting'));