const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const ctrl = require('./controller');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(err => console.log(err));

app.get('/api/shelf/:id', ctrl.getShelf);
app.get('/api/bin/:id', ctrl.getBin);
app.put('/api/bin/:id', ctrl.updateBin);
app.delete('/api/bin/:id', ctrl.deleteBin);
app.post('/api/bin/:id', ctrl.createBin);



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

