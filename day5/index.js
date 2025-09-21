
const express = require('express');
const app = express();
const port = 3000;

const courses = [
    {
        id: 1,
        title: 'js course',
        price: 1000,
    },
    {
        id: 2,
        title: 'react course',
        price: 800,
    },
    {
        id: 3,
        title: 'node course',
        price: 1200,
    }
]

//CRUD (Create Read Update Delete)

app.get('/api/courses', (req, res) => {
    res.json(courses);
});


app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.get('/api/courses/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
