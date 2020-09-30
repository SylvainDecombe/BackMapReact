const mongoose = require ('mongoose');

await mongoose.connect('mongodb://localhost:3000/gestions', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});