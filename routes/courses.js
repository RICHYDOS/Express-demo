const Joi = require('joi');
const express = require('express');
const router = express.Router();
const courses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
]


router.get('/', (req, res) => {
    res.send(courses);
});

// An API endpoint for getting a particular course
router.get('/:id', (req, res) => {
    // The "find" method takes in an array object and checks whether the id in each object is the same as the id request parameter
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("Course not found");
    res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;