const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});