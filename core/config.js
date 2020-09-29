const mongoose = require('mongoose');

const dbconnect = async () => {
	try{
		mongoose.connect(process.env.DB_CONNECT, {
			useNewUrlParser: true, 
			useUnifiedTopology: true},
			()=> console.log("Mongo OK")
		);
	}catch(error){
		throw new Error('Mongo KO');
	}
}

module.exports = { dbconnect }