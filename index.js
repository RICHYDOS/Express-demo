const express = require('express');
const app = express();
app.use(express.json());

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
    res.send(course)
});

app.post('/api/courses', (req, res) => {
    console.log(req.body, courses);
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}`));