const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');

require('./models/Task');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
require('./routes/index')(app);

app.use(express.static('frontend/dist/frontend'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname), 'frontend', 'dist/frontend', 'index.html');
});

app.listen(process.env.PORT, () => {
    console.log('To do list');
});
