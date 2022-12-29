const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(express.static('public'));
app.use(logger);

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("Morgan Enabled...");
}

const courses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
]


app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


// An API endpoint for getting a particular course
app.get('/api/courses/:id', (req, res) => {
    // The "find" method takes in an array object and checks whether the id in each object is the same as the id request parameter
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("Course not found");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // Using the Joi class for Input Validation
    const result = validateCourse(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Check if the particular course is in our list of courses
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send("Course not found");

    //validate user input
    const result = validateCourse(req.body);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send("Course not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(course);
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}`));