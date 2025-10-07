
const express = require('express');
const {body, validationResult} = require('express-validator')
const app = express();

app.use(express.json())

let courses = [
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

app.post('/api/courses', 
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isLength({min: 2})
            .withMessage('Name must be at least 2 characters long'),
        body('price')
            .notEmpty()
            .withMessage('Price is required'),
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newCourse = {id: courses.length+1, ...req.body}
    courses.push(newCourse)
    res.status(201).json(newCourse)
})

app.patch('/api/courses/:id', (req, res) => {
        
        const id = parseInt(req.params.id);
        let course = courses.find(c => c.id === id);
        if (!course) return res.status(404).json({msg: 'The course with the given ID was not found.'});
        course = {...course, ...req.body};
        res.json(course);
    }
)

app.delete('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    courses = courses.filter((c) => c.id !== id);
    res.status(204).json({success: true});
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})