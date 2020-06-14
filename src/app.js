import express from 'express';
const app = express();
import mongoose from 'mongoose';

import {config} from './config/env/dev'
import {router} from './api/index';
import { globalMiddlewares } from './api/middlewares/global';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + config.database,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.error('Failed ' + err);
});

globalMiddlewares(app);
app.use('/api', router);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({error: error.message});
})

app.listen(config.port, () => {
    console.log('Running on port 3000');
})