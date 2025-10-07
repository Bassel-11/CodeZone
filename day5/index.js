const express = require('express');
const app = express();

const courses = [
    {
        id: 1,
        name: "react",
        price: 299
    },
    {
        id: 2,
        name: "js",
        price: 800
    }
]

app.get('/api/courses', (req, res) => {
    res.json(courses);
}); 

app.get('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.json(course)
})


app.listen(3000, () => {
    console.log('listening on port 3000')
})