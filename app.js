const dotenv = require('dotenv');
const express = require('express');
const faker = require('faker');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const dbconnect = require('./core/config');

const Customer = require('./models/customer');
const auth = require('./routes/auth');
const { validateToken } = require('./controllers/index');

dotenv.config();
dbconnect.dbconnect();

const app = express();
const router = express.Router();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


app.use('/api/auth', auth);


app.get('/customers', [validateToken], async(req, res, next) => {
    try {
        const customers = await Customer.find();
        return res.json(customers);
    } catch (error) {
        return res.send({ status: 'fail', message: error })
    }
});
/*
router.post('/customers', async (req, res, next)=> {
	const customers = Customer({
		name: req.body.name
	})
	try {
		const saveCustomers = await customers.save();
		return res.json(saveCustomers);
	}catch(error){
		return res.send({ status :'fail', message: error})
	}
});

app.use('/', router );
*/
app.listen(3000, () => console.log('Server starting'));