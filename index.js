const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');
const routes = require('./routes/user');
const router = require('./routes/notes')

const app = express();

app.use(bodyParser.json());

app.use('/api/', routes);
app.use('/data/',router);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});