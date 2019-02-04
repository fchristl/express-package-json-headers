const {addPackageJsonHeaders} = require('../dist/index');
const express = require('express');
const app = express();

app.use(addPackageJsonHeaders);

app.get('/', (req, res) => res.send('Hi!'));
app.listen(3000);