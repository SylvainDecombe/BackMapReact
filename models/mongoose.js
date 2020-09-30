const mongoose = require ('mongoose');

await mongoose.connect('mongodb://localhost:8081/gestions', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});