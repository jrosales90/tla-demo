const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('./models/Task');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());

require('./routes/index')(app);

app.listen(process.env.PORT, () => {
    console.log('To do list');
});
