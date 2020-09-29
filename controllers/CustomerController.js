const { json } = require('express');
const Customer = require('../models/CustomerModel');

/////////////////////////////////////
//Récupération de customer par token
/////////////////////////////////////
const getByToken = async(req, res, next) => {
    try {
        const customers = await Customer.find();
        return res.json(customers);
    } catch (error) {
        console.log(error);
        return res.send({ status: 'fail', message: error })
    }
}

/*
const postCustomer = async (req, res, next)=> {
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
*/

module.exports = {  getByToken };