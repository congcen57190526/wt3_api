const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const itemsController = require('./controllers/items');
const categoriesController = require('./controllers/categories');
const supplierController = require('./controllers/supplier');
const transactionsController = require('./controllers/transaction');
const storageLocationController = require('./controllers/storageLocations');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yes', // or ""
    database: 'testing_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use('/items', itemsController(db));
app.use('/categories', categoriesController(db));
app.use('/suppliers', supplierController(db));
app.use('/employees', supplierController(db));
app.use('/transaction', transactionsController(db));
app.use('/storage', storageLocationController(db));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
