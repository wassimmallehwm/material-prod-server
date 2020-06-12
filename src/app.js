import express from 'express';
const app = express();

import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invoices',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.error('Failed ' + err);
});


import {router} from './config/routes';
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, token');
    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use('/api', router);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({error: error.message});
})

app.listen(3000, () => {
    console.log('Running on port 3000');
})