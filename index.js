const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

// Template Engine
app.set('view engine', 'pug');

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("Morgan Enabled...");
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}`));