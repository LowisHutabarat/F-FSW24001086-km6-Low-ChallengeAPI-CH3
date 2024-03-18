const express = require('express');


const app = express();

const carRouter = require('./routes/carRouter')

//middleware untuk membaca json dari request body ke kita
app.use(express.json())

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// app.get('/', defaultRouter );
// banyak data

app.use('/api/v1/',carRouter);


module.exports = app;